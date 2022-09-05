import { useCallback, useEffect, useReducer } from "react";
import { Text, TextInput, View, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { useMutation } from "react-query";
import tw from "twrnc";
import { signInRequest } from "../api/queries";
import CustomButton from "../components/CustomButton";
import Layout from "../components/Layout";
import { isValidEmail, isValidPassword } from "../utils/validators";

const initialFormState = {
  password: "",
  email: "",
  validEmail: true,
  validPassword: true,
};
const formReducer = (state, action) => {
  switch (action.type) {
    case "PASSWORD_CHANGE":
      return {
        ...state,
        validPassword: isValidPassword(action.payload),
        password: action.payload,
      };
    case "EMAIL_CHANGE":
      return {
        ...state,
        validEmail: isValidEmail(action.payload),
        email: action.payload,
      };
    default:
      return state;
  }
};

const LoginScreen = ({ navigation }) => {
  const [formState, dispatchFormState] = useReducer(
    formReducer,
    initialFormState
  );
  const loginMutation = useMutation(() =>
    signInRequest(formState.email, formState.password)
  );
  const handleFormChange = (type: string, input: string) => {
    dispatchFormState({
      type,
      payload: input,
    });
  };

  const handleOnSubmit = useCallback(() => {
    loginMutation.mutate();
  }, [loginMutation]);

  const showToast = () => {
    Toast.show({
      type: "error",
      text2: "There was an error on your credentials. Please verify them.",
    });
  };

  useEffect(() => {
    if (
      loginMutation.isSuccess &&
      formState.validEmail &&
      formState.validPassword
    ) {
      navigation.navigate("App");
    }
    if (loginMutation.isError) {
      showToast();
    }
    () => loginMutation.reset();
  }, [loginMutation]);

  return (
    <Layout>
      <Toast position="top" />
      <View
        style={tw.style(
          "flex w-full content-center items-center justify-center flex-col"
        )}
      >
        <Text
          style={tw.style(
            "text-xs w-4/6 text-center mt-[20px] mb-[6px] tracking-[2px]"
          )}
        >
          EMAIL
        </Text>

        <TextInput
          onChangeText={(input: string) =>
            handleFormChange("EMAIL_CHANGE", input)
          }
          style={tw.style(
            "border-black border-[1px] border-solid h-[40px] w-4/6"
          )}
        />
        {formState.validEmail ? null : (
          <Text style={tw.style("text-xs text-red-600")}>
            Oops! Email not valid
          </Text>
        )}
        <Text
          style={tw.style(
            "text-xs w-4/6 text-center mt-[20px] mb-[6px] tracking-[2px]"
          )}
        >
          PASSWORD
        </Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={(input) => handleFormChange("PASSWORD_CHANGE", input)}
          style={tw.style(
            "border-black border-[1px] border-solid h-[40px] w-4/6"
          )}
        />
      </View>
      <View style={tw.style("w-[130px] self-center mt-[20px] mb-[20px]")}>
        {loginMutation.isLoading ? (
          <ActivityIndicator size="large" color="#ceaa18" />
        ) : (
          <CustomButton
            title="SIGN IN"
            onPress={() =>
              formState.validEmail &&
              formState.validPassword &&
              handleOnSubmit()
            }
          />
        )}
      </View>

      <View
        style={tw.style(
          "flex w-full content-center items-center justify-center flex-col"
        )}
      >
        <Text style={tw.style("text-[11px]")}>Forgot your password?</Text>

        <Text
          style={tw.style(
            "text-[13px] font-bold tracking-[4px] mt-[22px] mb-[12px]"
          )}
        >
          CONNECT WITH FACEBOOK
        </Text>

        <TextInput
          style={tw.style(
            "w-[50%] text-center py-[20px] text-[12px] border-t-black border-t-[1px] border-solid mt-[80px] tracking-[2px] font-bold"
          )}
        >
          SIGN UP
        </TextInput>
      </View>
    </Layout>
  );
};

export default LoginScreen;

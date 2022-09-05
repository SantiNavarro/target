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
        isValidPassword: isValidPassword(action.payload),
        password: action.payload,
      };
    case "EMAIL_CHANGE":
      return {
        ...state,
        isValidEmail: isValidEmail(action.payload),
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

  console.log("formState");
  console.log(formState);

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
    console.log("loginMutation");
    console.log(loginMutation);

    if (loginMutation.isSuccess) {
      // const { email, name } = loginMutation?.data?.data?.data || {};
      // const { client, uid } = loginMutation?.data?.headers || {};
      // const accessToken = loginMutation?.data?.headers["access-token"] || "";
      navigation.navigate("App");
      // dispatch(signIn({ email, name, accessToken, client, uid }));
    }
    if (loginMutation.isError) {
      showToast();
    }
  }, [loginMutation]);

  return (
    <Layout>
      <Toast position="top" />
      <View
        style={tw.style(
          "flex w-full content-center items-center justify-center flex-col"
        )}
      >
        <Text style={tw.style("text-xs w-4/6 text-center mt-20 mb-6 ")}>
          EMAIL
        </Text>
        <TextInput
          onChangeText={(input: string) =>
            handleFormChange("EMAIL_CHANGE", input)
          }
          style={tw.style("border-black border-1 border-solid h-40 w-4/6")}
        />
        <Text style={tw.style("text-xs w-4/6 text-center mt-20 mb-6 ")}>
          PASSWORD
        </Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={(input) => handleFormChange("PASSWORD_CHANGE", input)}
          style={tw.style("border-black border-1 border-solid h-40 w-4/6")}
        />
      </View>
      <View style={tw.style("w-130 self-center mt-20 mb-20")}>
        {loginMutation.isLoading ? (
          <ActivityIndicator size="large" color="#ceaa18" />
        ) : (
          <CustomButton title="SIGN IN" onPress={() => handleOnSubmit()} />
        )}
      </View>

      <View
        style={tw.style(
          "flex w-full content-center items-center justify-center flex-col"
        )}
      >
        <Text style={tw.style("text-[11px]")}>Forgot your password?</Text>

        <Text
          style={tw.style("text-[13px] text-bold tracking[4px] mt-22 mb-12")}
        >
          CONNECT WITH FACEBOOK
        </Text>

        <TextInput
          style={tw.style(
            "w-[60%] text-center py-20 text-12 border-y-black border-y-1 border-solid mt-80 tracking-[2px] text-bold"
          )}
        >
          SIGN UP
        </TextInput>
      </View>
    </Layout>
  );
};

export default LoginScreen;

import * as React from "react";
import { withFormik, FormikProps, Field } from "formik";
import { loginSchema } from "@voting/common";
import { View, Text } from "react-native";
import { Card, Button } from "react-native-elements";

import { InputField } from "../../shared/InputField";
import { NormalizedErrorMap } from "@voting/controller";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Card>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Login</Text>
          <Field
            name="email"
            placeholder="Email"
            component={InputField}
            containerStyle={{ width: "100%" }}
            autoCapitalize="none"
          />
          <Field
            name="password"
            secureTextEntry={true}
            placeholder="Password"
            component={InputField}
            containerStyle={{ width: "100%" }}
          />
          <Button
            style={{ marginTop: 30 }}
            title="submit"
            onPress={handleSubmit as any}
          />
        </Card>
      </View>
    );
  }
}

export const LoginView = withFormik<Props, FormValues>({
  validationSchema: loginSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);

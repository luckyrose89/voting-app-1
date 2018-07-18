import * as React from "react";
import { withFormik, FormikProps, Field, Form as FForm } from "formik";
import { loginSchema } from "@voting/common";
import { InputField } from "../../shared/InputField";
import { Link } from "react-router-dom";
import { Form, Icon, Button, Card } from "antd";
import { NormalizedErrorMap } from "@voting/controller";
import { NavBar } from "../../shared/NavBar";
const FormItem = Form.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  onFinish: any;
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <FForm style={{ display: "flex" }}>
          <Card style={{ margin: "auto" }}>
            <p>Login with Email</p>
            <div
              style={{
                width: 300,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "auto"
              }}
            >
              <Field
                name="email"
                // tslint:disable-next-line:jsx-no-multiline-js
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                  // tslint:disable-next-line:jsx-curly-spacing
                }
                placeholder="Email"
                component={InputField}
              />
              <Field
                name="password"
                type="password"
                // tslint:disable-next-line:jsx-no-multiline-js
                prefix={
                  (
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                  // tslint:disable-next-line:jsx-curly-spacing
                }
                placeholder="Password"
                component={InputField}
              />
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
                <div style={{ textAlign: "center" }}>Or </div>
                <Button style={{ width: "100%" }}>
                  <a href="http://localhost:4000/auth/twitter">
                    Sign In with Twitter <Icon type="twitter" />
                  </a>
                </Button>
              </FormItem>
              Or <Link to="/register">SignUp now!</Link>
            </div>
          </Card>
        </FForm>
      </React.Fragment>
    );
  }
}

export const LoginView = withFormik<Props, FormValues>({
  validationSchema: loginSchema,
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      console.log("fininshed");
      props.onFinish();
    }
  }
})(C);

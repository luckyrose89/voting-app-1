import * as React from "react";
import { withFormik, FormikProps, Field, Form as FForm } from "formik";
import { Link } from "react-router-dom";
import { validUserSchema } from "@voting/common";
import { InputField } from "../../shared/InputField";
import { NormalizedErrorMap } from "@voting/controller";
import { Form, Icon, Button, Card } from "antd";
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
            <p>Sign Up with Email</p>

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
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                placeholder="Email"
                component={InputField}
              />
              <Field
                name="password"
                type="password"
                prefix={
                  (
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
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
                  Register
                </Button>
                <div style={{ textAlign: "center" }}>or</div>
                <Button style={{ width: "100%" }}>
                  <a href={`${process.env.REACT_APP_SERVER_URL}/auth/twitter`}>
                    Sign In with Twitter <Icon type="twitter" />
                  </a>
                </Button>
              </FormItem>
              Or <Link to="/login">login now!</Link>
            </div>
          </Card>
        </FForm>
      </React.Fragment>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(C);

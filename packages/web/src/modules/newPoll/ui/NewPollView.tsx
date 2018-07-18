import * as React from "react";
import { Layout, Input, Button } from "antd";
import { NavBar } from "../../shared/NavBar";
import { withFormik, FormikProps } from "formik";
import { createPollValidation } from "@voting/common";
const { Content, Footer } = Layout;

interface FormValues {
  name: string;
  options: any;
}

interface Props {
  onFinish: (id: number) => void;
  submit: (values: FormValues) => any;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { values, handleChange, handleSubmit } = this.props;
    return (
      <Layout className="layout">
        <NavBar />

        <Content style={{ padding: "50px 50px" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            <h1>Make a new poll!</h1>
            <h3>Poll Title</h3>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Poll Title"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              <h3>Options (seperated by commas):</h3>
              <Input.TextArea
                rows={4}
                name="options"
                value={values.options}
                onChange={handleChange}
              />

              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: 10 }}
              >
                Create Poll
              </Button>
            </form>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export const NewPollView = withFormik<Props, FormValues>({
  validationSchema: createPollValidation,
  mapPropsToValues: () => ({ name: "", options: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    values.options = values.options.toString();
    values.options = values.options.split("\n");
    const errors = await props.submit(values);
    console.log(errors);
    const {
      data: {
        createPoll: {
          poll: { id }
        }
      }
    } = errors;
    console.log(id);
    if (errors.data.createPoll.errors) {
      setErrors(errors);
    } else {
      props.onFinish(id);
    }
  }
})(C);

import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import icon_dumbbell from '../../../shared/images/icon_dumbbell.webp';

import { Form, Input, Button, Select } from 'antd';

const RegisterForm = (props) => {

    const types = [];
    const { Option } = Select;
      const TEST_SITE_KEY = "6Ld2OOQZAAAAAHLrKF8i13FOmpH6LN_l-Xv8bmVl";
      const [loaded, setLoaded] = useState(true);
      const [captchaCompleted, setCaptchaCompleted] = useState(false);
      const _reCaptchaRef = React.createRef();
      const handleChange = (value) => {
        setCaptchaCompleted(true);
      };
        const asyncScriptOnLoad = () => {
          console.log("loaded");
        };
    props.data.authGetTypes.map((data) => {
        types.push(<Option key={data.ID} value={data.ID}>{data.Name}</Option>)
        return null;
    });

    return (
      <>
        <h1 className="TitleFontTypeRoboto mb-0">Crear Cuenta</h1>
        <img
          alt="react"
          src={icon_dumbbell}
          style={{ width: "70px" }}
          className="m-0"
        />
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={props.onFinish}
          layout={"vertical"}
          size={"medium"}
        >
          <Form.Item
            label="Correo:"
            name="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Por favor ingrese un correo valido",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contraseña:"
            name="Password"
            rules={[{ required: true, message: "Minimo 8 caracteres", min: 8 }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="TypeID"
            label="Tipo:"
            rules={[{ required: true, message: "Seleccione un tipo" }]}
          >
            <Select placeholder="Seleccione el tipo de cuenta">{types}</Select>
          </Form.Item>
          <Form.Item>
            {!captchaCompleted && (
              <Button
                disabled
                type="primary"
                htmlType="submit"
                style={{
                  background: "#FFF8E5",
                  color: "#231F20",
                  borderColor: "#e3a765",
                }}
              >
                Ingresar
              </Button>
            )}
            {captchaCompleted && (
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  background: "#ffbc02",
                  color: "#231F20",
                  borderColor: "#e3a765",
                }}
              >
                Registrarse
              </Button>
            )}
          </Form.Item>
          {loaded && (
            <ReCAPTCHA
              style={{ display: "inline-block" }}
              theme="light"
              ref={_reCaptchaRef}
              sitekey={TEST_SITE_KEY}
              onChange={handleChange}
              asyncScriptOnLoad={asyncScriptOnLoad}
            />
          )}
        </Form>
        {props.mutationLoading && (
          <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {props.mutationError && (
          <div className="alert alert-danger m-0" role="alert">
            {props.mutationError.message.substring(19)}
          </div>
        )}
      </>
    );
}

export default RegisterForm;
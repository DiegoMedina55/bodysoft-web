import React, { useState } from 'react';

import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";

import { Form, Input, Button } from 'antd';

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($token: String!, $newpassword: String!){
    authChagePassword(authChangePass:{Token:$token, NewPassword:$newpassword})
  }
`;


const ChangePassword = (props) => {

    const [isSuccesfull, setIsSuccesfull] = useState(false);
    const [ChPass, {data, loading, error }] = useMutation(CHANGE_PASSWORD, { errorPolicy: 'all' });

    const onSubmitNewPass = async (values) => {
        if (values.newpass === values.confnewpass) {
            try {
                await ChPass({ variables: { token: props.token, newpassword: values.newpass}, });
                setIsSuccesfull(true);
            } catch (e) { }
        } 
    };

    let message;
    if (isSuccesfull && !error) {
        message = <div className="alert alert-success m-0" role="alert">
            Contraseña Reestablecida. Puede iniciar sesión.
        </div>
    }

    if (loading) {
        return <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    }

    let messageError;
    if (error) {
        messageError = <div className="alert alert-danger m-0" role="alert">
                    Token expirado, realize nuevamente el proceso de cambio de contraseña
        </div>
    }


    return (
        <>
            
            <h1 className="TitleFontTypeRoboto">Nueva Contraseña</h1>
            <p>Ingrese y confirme su nueva contraseña.</p>
            <Form
                name="basic"
                onFinish={onSubmitNewPass}
                layout={'vertical'}
                size={'large'}
            >
                <Form.Item
                    label="Nueva contraseña"
                    name="newpass"
                    rules={[{ required: true, type: 'string', message: 'Ingrese mínimo 8 caracteres', min: 8}]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Confirme su contraseña"
                    name="confnewpass"
                    rules={[{ required: true, type: 'string', message: 'Ingrese mínimo 8 caracteres', min: 8}, ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('newpass') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject('Las contraseñas no coinciden.');
                        }})
                        ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ background: "#ffbc02", color: "#231F20", borderColor: "#e3a765" }}
                    >
                        Enviar
            </Button>
                </Form.Item>
            </Form>
            {message}
            {messageError}
        </>
    )
}

export default ChangePassword;
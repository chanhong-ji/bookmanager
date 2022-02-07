import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const LoginModal = styled.div`
  width: 50%;
  height: 70%;
  background-color: white;
  border-radius: 30px;
`;

const JoinModal = styled.div`
  width: 50%;
  height: 70%;
  background-color: white;
  border-radius: 30px;
`;

function ModalWindow() {
  const history = useHistory();
  const loginMatch = useRouteMatch("/login");
  const joinMatch = useRouteMatch("/join");
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  function onOverlayClick() {
    history.goBack();
    setError(null);
  }
  async function onJoinSubmit({ email, username, password, password2 }) {
    const response = await fetch("/api/join", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, username, password, password2 }),
    }).then((res) => res.json());
    response.success ? history.push("/login") : setError(response.message);
  }
  async function onLoginSubmit({ email, password }) {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    if (response.success) {
      history.push("/");
    } else {
      setError(response.message);
    }
  }
  return (
    <>
      {loginMatch ? (
        <Overlay onClick={onOverlayClick}>
          <LoginModal
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <form onSubmit={handleSubmit(onLoginSubmit)}>
              {<span>{error}</span> || null}
              <input
                {...register("email", { required: "Required" })}
                type="email"
                placeholder="Email address"
              />
              <input
                {...register("password", {
                  required: "Required",
                  minLength: 8,
                  maxLength: 16,
                })}
                type="password"
                placeholder="Password 8 to 16"
              />
              <button>Login</button>
            </form>
          </LoginModal>
        </Overlay>
      ) : null}
      {joinMatch ? (
        <Overlay onClick={onOverlayClick}>
          <JoinModal
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <form onSubmit={handleSubmit(onJoinSubmit)}>
              {<span>{error}</span> || null}
              <input
                {...register("email", { required: "Required" })}
                type="email"
                placeholder="Email address"
              />
              <input
                {...register("username", {
                  required: "Required",
                  minLength: 3,
                  maxLength: 10,
                })}
                placeholder="Username"
              />
              <input
                {...register("password", {
                  required: "Required",
                  maxLength: 16,
                })}
                type="password"
                placeholder="Password"
              />
              <input
                {...register("password2", {
                  required: "Required",
                  maxLength: 16,
                })}
                type="password"
                placeholder="Password Comfirm"
              />
              <button>Login</button>
            </form>
          </JoinModal>
        </Overlay>
      ) : null}
    </>
  );
}

export default ModalWindow;

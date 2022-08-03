import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "./Validation";
import "./SignUpForm.css";

const SignUpForm = ({ setUserState }) => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    setFormErrors(validateForm(userDetails));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetch("https://demo-api.now.sh/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          const { _id, firstName, LastName } = data;
          setUserState({ _id, firstName, LastName });
          setUserDetails({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
          navigate("/profile", { replace: true });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [formErrors]);

  return (
    <form id="signup" onSubmit={submitHandler} className="signup-form">
      <div className="signup-form__controls">
        <div className="signup-form__control">
          <label id="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            defaultValue={userDetails.firstName}
            onChange={changeHandler}
            aria-labelledby="firstName"
          />
          <p className="error">{formErrors.firstName}</p>
        </div>
        <div className="signup-form__control">
          <label id="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            aria-labelledby="lastName"
            defaultValue={userDetails.lastName}
            onChange={changeHandler}
          />
          <p className="error">{formErrors.lastName}</p>
        </div>
        <div className="signup-form__control">
          <label id="email">Email</label>
          <input
            type="email"
            name="email"
            aria-labelledby="email"
            defaultValue={userDetails.email}
            onChange={changeHandler}
          />
          <p className="error">{formErrors.email}</p>
        </div>
        <div className="signup-form__control">
          <label id="password">Password</label>
          <input
            type="password"
            name="password"
            aria-labelledby="password"
            defaultValue={userDetails.password}
            onChange={changeHandler}
          />
          <p className="error">{formErrors.password}</p>
        </div>
        <div className="signup-form__actions">
          <button type="submit">SignUp</button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;

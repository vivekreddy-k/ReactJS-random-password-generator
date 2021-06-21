import "./index.css";
import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class PasswordOptions extends Component {
  state = {
    passwordLength: 8,
    isUpperIncluded: false,
    isLowerIncluded: true,
    isNumberIncluded: false,
    isSpecialCharIncluded: false,
  };
  changePasswordLength = (event) => {
    this.setState({ passwordLength: event.target.value });
  };

  onChangeUpper = (event) => {
    this.setState((prevState) => ({
      isUpperIncluded: !prevState.isUpperIncluded,
    }));
  };

  inChangeLower = (event) => {
    this.setState((prevState) => ({
      isLowerIncluded: !prevState.isLowerIncluded,
    }));
  };

  isNumberIncluded = (event) => {
    this.setState((prevState) => ({
      isNumberIncluded: !prevState.isNumberIncluded,
    }));
  };

  isSpecialCharacterIncluded = (event) => {
    this.setState((prevState) => ({
      isSpecialCharIncluded: !prevState.isSpecialCharIncluded,
    }));
  };

  updateOptionsSelected = () => {
    const {
      passwordLength,
      isUpperIncluded,
      isLowerIncluded,
      isNumberIncluded,
      isSpecialCharIncluded,
    } = this.state;
    this.convertString(
      isUpperIncluded,
      isLowerIncluded,
      isNumberIncluded,
      isSpecialCharIncluded,
      passwordLength
    );
  };

  convertString = (
    isUpperIncluded,
    isLowerIncluded,
    isNumberIncluded,
    isSpecialCharIncluded,
    passwordLength
  ) => {
    const alphSmall = "abcdefghijklmnopqrstuvwxyz";
    const alphCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "1234567890";
    const symbols = "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
    let string = "";
    if (isUpperIncluded) {
      string += alphCaps;
    }
    if (isLowerIncluded) {
      string += alphSmall;
    }
    if (isNumberIncluded) {
      string += numbers;
    }

    if (isSpecialCharIncluded) {
      string += symbols;
    }
    if (
      isUpperIncluded === false &&
      isLowerIncluded === false &&
      isNumberIncluded === false &&
      isSpecialCharIncluded === false
    ) {
      this.notifyAllError("Atleast One Option need to be selected");
    } else {
      this.newPassword(string, passwordLength);
    }
  };

  generateQuickPassword = () => {
    this.setState({
      isUpperIncluded: true,
      isLowerIncluded: true,
      isNumberIncluded: true,
      isSpecialCharIncluded: true,
      passwordLength: 8,
    });
    const {
      isUpperIncluded,
      isLowerIncluded,
      isNumberIncluded,
      isSpecialCharIncluded,
      passwordLength,
    } = this.state;
    this.convertString(
      isUpperIncluded,
      isLowerIncluded,
      isNumberIncluded,
      isSpecialCharIncluded,
      passwordLength
    );
  };

  newPassword = (string, passwordLength) => {
    const { getRandomPassword } = this.props;
    let pass = "";
    if (string.length > 0 && passwordLength < 25) {
      for (let i = 0; i < passwordLength; i++) {
        pass += string.charAt(Math.round(Math.random() * string.length));
      }
      getRandomPassword(pass);
    } else if (passwordLength > 25 || passwordLength < 5) {
      this.notifyLengthError("password length can be in the range of 5 and 25");
    }
  };

  notifyLengthError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  notifyAllError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    const {
      isUpperIncluded,
      isNumberIncluded,
      isSpecialCharIncluded,
      isLowerIncluded,
      passwordLength,
    } = this.state;
    return (
      <div className="options-container">
        <form className="form-control">
          <ul className="unordered-list">
            <li className="list-item">
              <label htmlFor="password-strength" className="label-ele">
                Password Length
              </label>
              <input
                type="number"
                value={passwordLength}
                max="25"
                min="8"
                id="password-strength"
                onChange={this.changePasswordLength}
              />
            </li>
            <li className="list-item">
              <label htmlFor="upper-case" className="label-ele">
                Include Upper Case
              </label>
              <input
                type="checkbox"
                className="checkbox-ele"
                max="25"
                min="8"
                id="upper-case"
                checked={isUpperIncluded}
                onChange={this.onChangeUpper}
              />
            </li>
            <li className="list-item">
              <label htmlFor="lower-case" className="label-ele">
                Include Lower Case
              </label>
              <input
                type="checkbox"
                className="checkbox-ele"
                max="25"
                min="8"
                id="lower-case"
                checked={isLowerIncluded}
                onChange={this.inChangeLower}
              />
            </li>
            <li className="list-item">
              <label htmlFor="include-numbers" className="label-ele">
                Include Numbers
              </label>
              <input
                type="checkbox"
                className="checkbox-ele"
                max="25"
                min="8"
                id="include-numbers"
                checked={isNumberIncluded}
                onChange={this.isNumberIncluded}
              />
            </li>
            <li className="list-item">
              <label htmlFor="include-symbols" className="label-ele">
                Include Special Characters
              </label>
              <input
                type="checkbox"
                className="checkbox-ele"
                max="25"
                min="8"
                id="include-symbols"
                checked={isSpecialCharIncluded}
                onChange={this.isSpecialCharacterIncluded}
              />
            </li>
          </ul>
        </form>
        <div className="generate-password-container">
          <button
            className="generate-password"
            type="button"
            onClick={this.updateOptionsSelected}
          >
            Generate Password
          </button>
          <button
            className="generate-quick-password"
            type="button"
            onClick={this.generateQuickPassword}
          >
            Quick Password
          </button>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default PasswordOptions;

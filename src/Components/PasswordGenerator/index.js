import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Component } from "react";
import PasswordOptions from "../PasswordOptions";

class PasswordGenerator extends Component {
  state = {
    randomPassword: "",
  };

  getRandomPassword = (newRandomPassword) => {
    this.setState({ randomPassword: newRandomPassword });
  };

  copyToClipboard = () => {
    const { randomPassword } = this.state;
    this.copyTextToClipboard();
    if (randomPassword.length > 5) {
      this.notifySuccessClipboardMessage("password Copied to clipboard");
    } else if (randomPassword.length <= 5 || randomPassword.length > 25) {
      this.notifyErrorClipboardMessage("password length can't be less than 5");
    }
  };

  copyTextToClipboard = () => {
    const { randomPassword } = this.state;
    const newTextArea = document.createElement("textarea");
    newTextArea.textContent = randomPassword;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };

  notifySuccessClipboardMessage = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  notifyErrorClipboardMessage = (message) => {
    toast.warn(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    const { randomPassword } = this.state;
    return (
      <div className="app-container">
        <div className="password-generator-container">
          <div className="container-header">
            <h1 className="password-heading">Password Generator</h1>
            <div className="password-copy-container">
              <div className="display-password">
                <p className="password-text">{randomPassword}</p>
              </div>
              <button
                className="pass-copy-btn"
                type="button"
                onClick={this.copyToClipboard}
              >
                <i className="fas fa-clipboard clipboard-icon"></i>
              </button>
            </div>
          </div>

          <div className="password-options-container">
            <PasswordOptions getRandomPassword={this.getRandomPassword} />
          </div>
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

export default PasswordGenerator;

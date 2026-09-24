import { useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputLabel,
  ListSubheader,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

const MuiForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [gender, setGender] = useState("male");
  const [subject, setSubject] = useState({ english: true, maths: false, physics: false });
  const [programmingLanguage, setProgrammingLanguage] = useState("react");
  const [open, setOpen] = useState(false);

  const handleFullNameChange = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z ]/g, "").slice(0, 20);
    setFullName(value);
    setFullNameError(value && value.length < 3 ? "Use 3 to 20 letters." : "");
  };

  const handleEmailChange = (event) => {
    const value = event.target.value.slice(0, 60);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(value);
    setEmailError(value && !emailPattern.test(value) ? "Enter a valid email address." : "");
  };

  const handleUserNameChange = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 20);
    setUserName(value);
    setUserNameError(value && value.length < 3 ? "Use 3 to 20 letters or numbers." : "");
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value.slice(0, 15);
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPassword(value);
    setPasswordError(value && !passwordPattern.test(value) ? "Use 8 to 15 chars with upper, lower, number and symbol." : "");
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhoneNumber(value);
    setPhoneNumberError(value && value.length !== 10 ? "Use exactly 10 digits." : "");
  };

  const handleUrlChange = (event) => {
    const value = event.target.value.slice(0, 120);
    setUrl(value);
    if (!value) {
      setUrlError("");
      return;
    }

    try {
      const parsedUrl = new URL(value);
      setUrlError(parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:" ? "" : "Use an http or https URL.");
    } catch {
      setUrlError("Enter a valid URL.");
    }
  };

  const handleSubjectChange = (event) => {
    setSubject((currentSubject) => ({ ...currentSubject, [event.target.name]: event.target.checked }));
  };

  const handleResumeChange = (event) => {
    const file = event.target.files && event.target.files[0];
    setResumeFileName(file ? file.name : "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const hasErrors = fullNameError || emailError || userNameError || passwordError || phoneNumberError || urlError;
    if (hasErrors) {
      toast.error("Please fix the highlighted fields.");
      setIsLoading(false);
      return;
    }

    if (!fullName || !email || !userName || !password || !phoneNumber || !url || !resumeFileName) {
      toast.error("Please complete every required field.");
      setIsLoading(false);
      return;
    }

    setOpen(true);
    window.setTimeout(() => setIsLoading(false), 700);
  };

  return (
    <section id="form" className={styles.container} aria-labelledby="form-title">
      <div className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Material UI form patterns</p>
            <h1 id="form-title">Build a form users can complete with confidence.</h1>
            <p className={styles.intro}>A practical form demo with field validation, choice controls, a resume upload and a clear confirmation step.</p>
          </div>
          <div className={styles.heroImage}>
            <img src={import.meta.env.BASE_URL + "preview.png"} alt="Material UI form preview" />
          </div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.cardHeading}>
            <div><p className={styles.eyebrow}>Try the flow</p><h2>Candidate details</h2></div>
            <CheckCircleOutlineIcon aria-hidden="true" />
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.section1}>
              <TextField className={styles.textField} value={fullName} onChange={handleFullNameChange} label="Full name" placeholder="Your full name" error={Boolean(fullNameError)} helperText={fullNameError} required />
              <TextField className={styles.textField} value={email} onChange={handleEmailChange} label="Email" placeholder="you@example.com" error={Boolean(emailError)} helperText={emailError} required type="email" />
              <TextField className={styles.textField} value={userName} onChange={handleUserNameChange} label="Username" placeholder="yourname" error={Boolean(userNameError)} helperText={userNameError} required />
              <TextField className={styles.textField} value={password} onChange={handlePasswordChange} label="Password" placeholder="Create a strong password" error={Boolean(passwordError)} helperText={passwordError || "8 to 15 characters"} required type="password" />
              <TextField className={styles.textField} value={phoneNumber} onChange={handlePhoneNumberChange} label="Phone number" placeholder="10 digit number" error={Boolean(phoneNumberError)} helperText={phoneNumberError} required inputProps={{ inputMode: "numeric" }} />
              <TextField className={styles.textField} value={url} onChange={handleUrlChange} label="Portfolio URL" placeholder="https://example.com" error={Boolean(urlError)} helperText={urlError} required type="url" />
            </div>

            <div className={styles.section2}>
              <FormControl className={styles.choiceCard}>
                <FormLabel id="gender-buttons-group-label">Gender</FormLabel>
                <RadioGroup aria-labelledby="gender-buttons-group-label" value={gender} onChange={(event) => setGender(event.target.value)} row>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>

              <FormControl className={styles.choiceCard} required component="fieldset" variant="standard">
                <FormLabel component="legend">Subjects</FormLabel>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox checked={subject.english} onChange={handleSubjectChange} name="english" />} label="English" />
                  <FormControlLabel control={<Checkbox checked={subject.maths} onChange={handleSubjectChange} name="maths" />} label="Maths" />
                  <FormControlLabel control={<Checkbox checked={subject.physics} onChange={handleSubjectChange} name="physics" />} label="Physics" />
                </FormGroup>
              </FormControl>
            </div>

            <div className={styles.section3}>
              <TextField className={styles.fileField} label="Resume" type="file" onChange={handleResumeChange} helperText={resumeFileName || "PDF, DOC or DOCX"} InputLabelProps={{ shrink: true }} inputProps={{ accept: ".pdf,.doc,.docx" }} />
              <FormControl className={styles.languageField}>
                <InputLabel id="programming-language-label">Programming language</InputLabel>
                <Select labelId="programming-language-label" value={programmingLanguage} label="Programming language" onChange={(event) => setProgrammingLanguage(event.target.value)}>
                  <ListSubheader>Frontend</ListSubheader>
                  <MenuItem value="react">React.js</MenuItem>
                  <MenuItem value="node">Node.js</MenuItem>
                  <ListSubheader>Backend and data</ListSubheader>
                  <MenuItem value="express">Express.js</MenuItem>
                  <MenuItem value="mongodb">MongoDB</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Button variant="contained" type="submit" disabled={isLoading} className={styles.submitButton} startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <CheckCircleOutlineIcon />}>
              {isLoading ? "Checking details" : "Review form"}
            </Button>
          </form>
        </div>

        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="summary-title" fullWidth maxWidth="sm">
          <DialogTitle id="summary-title" className={styles.dialogTitle}>
            Submission summary
            <IconButton onClick={() => setOpen(false)} aria-label="Close summary"><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent className={styles.dialogContent}>
            <p className={styles.dialogIntro}>Review the values captured by the form before closing this dialog.</p>
            <div className={styles.detailGrid}>
              <div><strong>Full name</strong><span>{fullName}</span></div>
              <div><strong>Email</strong><span>{email}</span></div>
              <div><strong>Username</strong><span>{userName}</span></div>
              <div><strong>Password</strong><span>Hidden for your safety</span></div>
              <div><strong>Phone number</strong><span>{phoneNumber}</span></div>
              <div><strong>Portfolio URL</strong><span>{url}</span></div>
              <div><strong>Resume</strong><span>{resumeFileName}</span></div>
              <div><strong>Gender</strong><span>{gender}</span></div>
              <div><strong>Subjects</strong><span>{Object.entries(subject).filter(([, selected]) => selected).map(([name]) => name).join(", ")}</span></div>
              <div><strong>Programming language</strong><span>{programmingLanguage}</span></div>
            </div>
          </DialogContent>
          <DialogActions><Button onClick={() => setOpen(false)}>Close</Button></DialogActions>
        </Dialog>
      </div>
    </section>
  );
};

export default MuiForm;

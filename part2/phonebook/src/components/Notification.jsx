const Notification = ({ message, type }) => {
  return (
    <>
      <p className={type === "success" ? "success" : "failure"}>{message}</p>
    </>
  );
};

export default Notification;

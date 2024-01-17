const Notification = ({message, messageStyle}) => {
    return(
        <div style={message ? messageStyle : null}>
            {message}
        </div>
    )
}

export default Notification;
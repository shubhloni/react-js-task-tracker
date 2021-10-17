import PropTypes from 'prop-types'

const Button = (props) => {
    return (
        <button onClick={props.onClick} style={{ backgroundColor: props.color }} className='btn'>{props.text}</button>
    )
}

Button.defaulfProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button

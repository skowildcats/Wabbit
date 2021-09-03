import ChangePasswordModal from './change_password'
import { connect } from 'react-redux'
import { updatePassword } from '../../actions/session_actions'


const mapStateToProps = (state) => ({
  email: state.session.user.email
})

const mapDispatchToProps = dispatch => ({
  updatePassword: (userData) => dispatch(updatePassword(userData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordModal)

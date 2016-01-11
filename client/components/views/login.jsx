Login = React.createClass({
  validations() {
    let component = this;

    return {
      rules: {
        emailAddress: { email: true, required: true },
        password:     { required: true }
      },
      submitHandler() {
        let { getValue } = ReactHelpers;

        // TODO: Is there a better way to access nested component refs? Yeesh!

        let form     = component.refs.loginForm.refs.form,
            email    = getValue( form, '[name="emailAddress"]' ),
            password = getValue( form, '[name="password"]' );

        Meteor.loginWithPassword( email, password, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          } else {
            Bert.alert( 'Logged in!', 'success' );
          }
        });
      }
    };
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    let passwordLabelLink = {
      href: '/recover-password',
      label: 'Forget Password?'
    };

    return <GridRow>
      <GridColumn className="col-xs-12 col-sm-6 col-md-4">
        <PageHeader size="h4" label="Log In" />
        <InfoAlert>
          To access the demo, you can use the email address <strong>admin@admin.com</strong> and the password <strong>password</strong>.
        </InfoAlert>
        <Form ref="loginForm" id="login" className="login" validations={ this.validations() } onSubmit={ this.handleSubmit }>
          <FormGroup>
            <EmailInput ref="emailAddress" showLabel={ true } />
          </FormGroup>
          <FormGroup>
            <PasswordInput ref="password" showLabel={ true } labelLink={ passwordLabelLink } />
          </FormGroup>
          <FormGroup>
            <SuccessButton type="submit" label="Login" />
          </FormGroup>
        </Form>
        <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
      </GridColumn>
    </GridRow>;
  }
});

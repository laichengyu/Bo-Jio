import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react';
import './PrivacyPolicy.css';

class PrivacyPolicy extends Component {
  render() {
    return (
      <div className="PrivacyPolicy">
        <Header as='h1'>Privacy Policy</Header>

        This Privacy Policy describes how users’ personal information is handled in order to engage in the services available on our application. It applies generally to web pages where this policy appears in the footer. By accepting the Privacy Policy, you express consent to our collection, storage, use and disclosure of your personal information as described in this Privacy Policy. This Privacy Policy is effective upon acceptance for new users and is otherwise effective on 9th September 2017.

        <Header as='h2'>Definitions</Header>
        <List ordered>
          <List.Item>References to “Our”, “We”, “Us” and BoJio! shall be references to BoJio!</List.Item>
          <List.Item>References to “You”, “Users” and “Your” shall mean references to user(s) visiting this web site, as the context requires.</List.Item>
        </List>

        <Header as='h2'>Information Collection</Header>

        Browsing our websites does not require your identities to be revealed. However, under the following circumstances, you are not anonymous to us.

        <Header as='h2'>User</Header>

        We will ask for your personal information. The personal information collected includes but not restricting to the following:
        <List ordered>
          <List.Item>Private information such as name and birthdate</List.Item>
          <List.Item>Contact information such as email address, mobile number and physical address</List.Item>
          <List.Item>Additional information which we may ask for if we believe the site policies are violated</List.Item>
        </List>
        Once you log into the account, your identity will be revealed to us.

        <Header as='h2'>Information Usage</Header>

        <p>The primary purpose in collecting personal information is to provide the users with a smooth and customized experience.</p>

        <span>We will use the information collected for the following purposes</span>
        <List ordered>
          <List.Item>To provide its intended services</List.Item>
          <List.Item>To resolve disputes, and troubleshoot problems and errors</List.Item>
          <List.Item>To assist in law enforcement purposes and prevent/restrict the occurrences of potentially illegal or prohibited activities</List.Item>
        </List>
        <Header as='h2'>Disclosure of information</Header>

        We may share information with governmental agencies or other companies assisting us in fraud prevention or investigation. We may do so when:
        <List ordered>
          <List.Item>Permitted or required by law; or,</List.Item>
          <List.Item>Trying to protect against or prevent actual or potential fraud or unauthorized transactions; or,</List.Item>
          <List.Item>Investigating fraud which has already taken place.</List.Item>
        </List>
        The information is not provided to these companies for marketing purposes.

        <Header as='h2'>Usage of Cookies</Header>

        Cookies are small files placed in your computer hard drives. We use it to analyse our site traffic. We have also used cookies to maintain your signed in status when you login to our websites.

        <Header as='h2'>Commitment to Data Security</Header>

        Your personally identifiable information is kept secure. Only authorized employees, agents and contractors (who have agreed to keep information secure and confidential) have access to this information. All emails and newsletters from this site allow you to opt out of further mailings.

        <Header as='h2'>Changes to the Policies</Header>

        <span>We reserved the rights to amend this Privacy Policy at any time. Upon posting of new policies, it will take immediate effect. We may notify you should there be any major changes to the policies.</span>
      </div>
    );
  }
}

export default PrivacyPolicy;

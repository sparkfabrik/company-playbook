/_
Description: Guide to setup Gitlab Slack notifications
Sort: 140
_/

## Table of Content

- [GitLab Slack App](https://api.slack.com/apps)
- [Recommended Settings](#recommended-settings)
- [Steps](#steps)
  - [Private Channels](#private-channels)

## Recommended Settings

We recommend configuring the following triggers and settings at the Group level (these are guidelines—feel free to adapt them to your needs):

- **An issue is created, closed, or reopened**: main channel (e.g., `#test`)
- **A merge request is created, closed, or reopened**: notifications channel (e.g., `#test-notifications`)
- **A pipeline status changes**: notifications channel (e.g., `#test-notifications`)
- **Notify only broken pipelines**: `No`
- **Branches for which notifications are to be sent**: `All branches`
- **Integration**:
  - **Public Slack channels**: The Slack app has permission to write to all public channels.
  - **Private Slack Channels**: [See section below](#private-channels)
  - **GitLab group**: Setting the integration to the group level applies the setting to all projects in the group and sub-groups. You can then customize an individual project if needed.

## Steps

1. **Access GitLab Project/Group Integrations**  
   Go to **Settings > Integrations** in the GitLab project or group you want to connect.

2. **Add the “GitLab for Slack” App**  
   Click “Add integration” and search for `GitLab for Slack app`.

   ![step-1](/assets/images/gitlab-slack-notifications/notifications-step-1.png)

3. **Install the App on Slack**  
   Follow the link to install the app on Slack. You may need to authorize access and select your Slack workspace.

   ![step-2](/assets/images/gitlab-slack-notifications/notifications-step-2.png)
   ![step-3](/assets/images/gitlab-slack-notifications/notifications-step-3.png)

4. **Configure Triggers**  
   Choose which GitLab events you want to notify Slack about (e.g., push, merge request, pipeline, etc.).  
   ⚠️ Specify one or more Slack channels to receive notifications. Remember to prefix the channel name with `#` (e.g., `#test`).

   ![step-4](/assets/images/gitlab-slack-notifications/notifications-step-4.png)

5. **Customize Notifications**  
   Set the level of detail for notifications according to your preferences.

   ![step-5](/assets/images/gitlab-slack-notifications/notifications-step-5.png)

6. **Save Settings**  
   Click “Save changes” to activate the integration.

7. **Verify Functionality**  
   Perform a test action (such as a push or merge request) and check that the notification appears in the selected Slack channel.

### Private Channels

> ⚠️ WARNING **Private Slack channels**: If you do not do this, the application will not have the necessary permissions to post messages in the private channel.

For private channels, **you need to add the `GitLab (\***)` integration to the channel\*\*.

1. Open the channel `settings` and click the tab `Integrazioni`

   ![private-channel-1](/assets/images/gitlab-slack-notifications/private-channel-1.png)

2. Click `aggiungi app`
3. Write `Gitlab (***)` in the search bar and click `Aggiungi`

   ![private-channel-2](/assets/images/gitlab-slack-notifications/private-channel-2.png)

4. Now the Gitlab integration has been added to the channel and can send notifications

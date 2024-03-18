# Open Frames Bounty

Welcome to the Open Frames Bounty Program! 🚀 If you're passionate about interoperability and eager to make your Frame a part of the ever-growing Open Frames ecosystem, you're in the right place. By following the steps you will enhance your Frame with the necessary metadata for Open Frames compatibility, according to this [standard](https://github.com/open-frames/standard). Let's dive in!

### Step 1: Modify the Metadata in Your Frame

First, you need to add the specified metadata to your Frame. Based on the provided context, it looks like you're working with a TypeScript file in a project. Here's how you can add the metadata depending on your environment:

**HTML**

```html
<meta property="of:accepts:xmtp" content="2024-02-01" />
```

**OnChainKit**

```jsx
export const metadata: Metadata = {
  title: /*Your frame metadata*/,
  description: /*Your frame metadata*/,
  openGraph: {/*Your frame metadata*/},
  other: {
    ...frameMetadata,
    'of:accepts:xmtp': '2024-02-01', // Ensure this line is added or updated
  },
};
```

**FramesJS**

```jsx
//code sample soon
```

Go here learn more about the Open Frames [specification](https://github.com/open-frames/standard).

### Step 2: Add Your Frame to the Compatible Frames Section

1. **Fork the [Awesome-Open-Frames Repo](https://github.com/open-frames/awesome-open-frames)**: Navigate to the GitHub page of the Awesome-Open-Frames repository and click the "Fork" button.

2. **Clone Your Fork**: Clone the forked repository to your local machine.

3. **Modify the README.md**: Add your Frame to the `Compatible Frames` section. Follow the formatting used by other entries in the list.

4. **Commit and Push Your Changes**: Commit the changes to your fork and push them.

5. **Create a Pull Request**: Navigate to the original Awesome-Open-Frames repository on GitHub. You should see an option to create a pull request based on the changes you pushed to your fork. Fill out the necessary details and submit the PR.

### Step 3: Send Your Frame via DM

1. **Access XMTP**: Go to the any of the apps listed in the [Compatible Applications](https://github.com/open-frames/awesome-open-frames?tab=readme-ov-file#compatible-messaging-apps)

2. **Connect Your Wallet**: Follow the prompts to connect your Ethereum wallet. Make sure you're using the wallet address that you want to be contacted on for the bounty.

3. **Send a DM**: Compose a new message to `hi.xmtp.eth`. In the message, include a link to your Frame and mention that you've added it to the Compatible Frames section as per the bounty requirements.

### Step 4: Wait for Contact

After completing the above steps, our team will contact you through the provided wallet address and send the payment in USDC through XMTP.

Make sure you've followed all the guidelines and requirements specified in the bounty to ensure eligibility.
Good luck!

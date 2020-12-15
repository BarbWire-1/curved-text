registerSettingsPage(({ settings: { myProp } }) => (
    <Page>
        <Section title="Settings">{myProp && <Text>{myProp}</Text>}</Section>
    </Page>
));
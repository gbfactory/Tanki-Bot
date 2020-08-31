module.exports = (client) => {
    console.log('[Tanki Bot] Started!');
    client.user.setActivity("Tanki Online", {
        type: "PLAYING"
    });
}
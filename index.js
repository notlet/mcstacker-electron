const { app, BrowserWindow, Menu } = require('electron');

app.on('ready', () => {
    const mainWindow = new BrowserWindow({icon: `${__dirname}/icon/Icon-512x512.png`});
    const menuTemplate = [
        {
            label: 'Quit',
            click: () => app.quit()
        },
        {
            label: 'Select Minecraft Version',
            submenu: [
                {
                    label: '1.20snapshots',
                    type: 'radio',
                },
                {
                    label: '1.19',
                    type: 'radio',
                    checked: true
                },
                {
                    label: '1.18',
                    type: 'radio',
                },
                {
                    label: '1.17',
                    type: 'radio',
                },
                {
                    label: '1.16',
                    type: 'radio',
                },
                {
                    label: '1.15',
                    type: 'radio',
                },
                {
                    label: '1.14',
                    type: 'radio',
                },
                {
                    label: '1.13',
                    type: 'radio',
                },
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    menu.items[1].submenu.items.forEach(i => {
        i.click = () => {
            menu.items[1].submenu.items.forEach((otherItem) => {
                otherItem.checked = false;
            });
            i.checked = true;
            mainWindow.loadURL(`file://${__dirname}/src/mcstacker-${i.label}.html`)
        }
    })
    Menu.setApplicationMenu(menu);

    mainWindow.maximize();
    mainWindow.loadURL(`file://${__dirname}/src/mcstacker-1.19.html`);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
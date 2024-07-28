window.onload = function () {
    ThemeModule.setTheme();
    setTemplate();
    onPageLoaded();
    ThemeModule.initialisecpSwitchBox();

    if (typeof pageStartUp !== 'undefined')
        pageStartUp();
}
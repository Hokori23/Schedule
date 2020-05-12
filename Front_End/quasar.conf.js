// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function(ctx) {
    return {
        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://quasar.dev/quasar-cli/cli-documentation/boot-files
        boot: ["i18n", "axios", "imgErr", "function", "quasar-lang-pack"],

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
        css: ["app.sass"],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            // 'ionicons-v4',
            // 'mdi-v4',
            // 'fontawesome-v5',
            // 'eva-icons',
            // 'themify',
            // 'line-awesome',
            // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

            "roboto-font", // optional, you are not bound to it
            "material-icons" // optional, you are not bound to it
        ],

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
        framework: {
            iconSet: "material-icons", // Quasar icon set
            lang: "zh-hans", // Quasar language pack
            // lang:'en-us',

            // Possible values for "all":
            // * 'auto' - Auto-import needed Quasar components & directives
            //            (slightly higher compile time; next to minimum bundle size; most convenient)
            // * false  - Manually specify what to import
            //            (fastest compile time; minimum bundle size; most tedious)
            // * true   - Import everything from Quasar
            //            (not treeshaking Quasar; biggest bundle size; convenient)
            all: "auto",

            components: [],
            directives: ["GoBack"],

            // Quasar plugins
            plugins: [
                "Dialog",
                "LoadingBar",
                "Notify",
                "QDate",
                "QSpinnerAudio",
                "QPullToRefresh"
            ],

            // QUasar plugins config
            config: {
                loadingBar: {
                    position: "top",
                    color: "warning",
                    size: "5px",
                    skipHijack: true
                },
                notify: {
                    color: "positive",
                    position: "bottom",
                    timeout: "500",
                    icon: "message"
                }
            }
        },

        // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
        supportIE: false,

        // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
        build: {
            vueRouterMode: "history", // available values: 'hash', 'history'
            showProgress: true,
            gzip: true,
            showProgress: true,

            // rtl: false, // https://quasar.dev/options/rtl-support
            // gzip: true,
            // analyze: true,

            // Options below are automatically set depending on the env, set them if you want to override
            preloadChunks: true,
            // preloadChunks: false,
            // extractCSS: false,

            //DIY***************************************************************
            publicPath: "assignment",
            vueRouterBase: "assignment",
            //DIY***************************************************************

            // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
            extendWebpack(cfg) {}
        },

        // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
        devServer: {
            https: true,
            port: 8080,
            open: true, // opens browser window automatically
            proxy: {
                "/api": {
                    target: "https://api.hokori.online/schedule",
                    // target: "http://localhost:8000/schedule",
                    changeOrigin: true,
                    pathRewrite: {
                        "^/api": ""
                    }
                }
            }
        },

        // animations: 'all', // --- includes all animations
        // https://quasar.dev/options/animations
        animations: ["fadeIn", "fadeOut", "zoomIn", "zoomOut"],

        // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
        ssr: {
            pwa: false
        },

        // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
        pwa: {
            workboxPluginMode: "InjectManifest", // 'GenerateSW' or 'InjectManifest'
            workboxOptions: {}, // only for GenerateSW
            manifest: {
                name: "作业板",
                short_name: "作业板",
                description: "作业板",
                display: "standalone",
                orientation: "portrait",

                //DIY***************************************************************
                background_color: "#ffffff",
                theme_color: "#1976D2",
                start_url: "/assignment/index.html",
                //DIY***************************************************************
                icons: [{
                        src: "statics/icons/icon-128x128.png",
                        sizes: "128x128",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/ms-icon-144x144.png",
                        sizes: "144x144",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-256x256.png",
                        sizes: "256x256",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-384x384.png",
                        sizes: "384x384",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ],
                metaVariables: {
                    appleMobileWebAppCapable: "yes",
                    appleMobileWebAppStatusBarStyle: "black-translucent",
                    appleTouchIcon120: "statics/icons/apple-icon-120x120.png",
                    appleTouchIcon180: "statics/icons/apple-icon-180x180.png",
                    appleTouchIcon152: "statics/icons/apple-icon-152x152.png",
                    appleTouchIcon167: "statics/icons/apple-icon-167x167.png",
                    appleSafariPinnedTab: "statics/icons/safari-pinned-tab.svg",
                    msapplicationTileImage: "statics/icons/ms-icon-144x144.png",

                    //DIY***************************************************************
                    msapplicationTileColor: "#1976D2"
                        //DIY***************************************************************
                }
            }
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
        cordova: {
            // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
            id: ""
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
        capacitor: {
            hideSplashscreen: true
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
        electron: {
            bundler: "packager", // 'packager' or 'builder'

            packager: {
                // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',
                // Windows only
                // win32metadata: { ... }
            },

            builder: {
                // https://www.electron.build/configuration/configuration

                appId: "schedule"
            },

            // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
            nodeIntegration: true,

            extendWebpack(cfg) {
                // do something with Electron main process Webpack cfg
                // chainWebpack also available besides this extendWebpack
            }
        }
    };
};

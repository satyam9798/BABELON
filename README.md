# Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

This projects needs following versions:
JDK: 11
gradle-8.0.1-all.zip
node>=16

# Mac emulator location

/Users/satyamshivam/Library/Android/sdk/emulator/emulator @Pixel3a -writable-system

# open url scheme

npx uri-scheme open "babelon://chat/2/16/group/temporary" --android

## 🚀 How to use

```sh
npx create-expo-app -e with-router
```

## 📝 Updated Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)

Set local.properties file in your android folder with the sdk location
eg:
sdk.dir = C:\\Users\\<user>\\AppData\\Local\\Android\\Sdk
for MAC
sdk.dir = /Users/USERNAME/Library/Android/sdk

For creating ios folder, run

```sh
npx expo run:ios
```

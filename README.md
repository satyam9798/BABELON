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

keytool -list -v -keystore ./app/debug.keystore -alias androiddebugkey -storepass android -keypass android
Alias name: androiddebugkey
Creation date: 01-Jan-2014
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Android Debug, OU=Android, O=Unknown, L=Unknown, ST=Unknown, C=US
Issuer: CN=Android Debug, OU=Android, O=Unknown, L=Unknown, ST=Unknown, C=US
Serial number: 232eae62
Valid from: Wed Jan 01 04:05:04 IST 2014 until: Wed May 01 04:05:04 IST 2052
Certificate fingerprints:
         SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
         SHA256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
Signature algorithm name: SHA1withRSA (weak)
Subject Public Key Algorithm: 2048-bit RSA key
Version: 3

Extensions:

#1: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: 0B F9 FE 38 89 D2 8A 9C   58 F0 C1 0A B7 0E 43 28  ...8....X.....C(
0010: D8 23 F3 20                                        .#.
]
]


Warning:
The certificate uses the SHA1withRSA signature algorithm which is considered a security risk. This algorithm will be disabled in a future update.

```

{
"type": "token",
"content":"31a8d5f2f906864e8382f3ad3093e787e0982f083dbd542332d70e7d6155e595"
}

      {
        "type": "check_messages"
      }
      {
        "type": "get_chats"
      }

      single


      {
        "type": "send_message",
        "request_id": "34",
    "content": {
      "text": "Hi",
      "user": {
        "_id": "9879879879",
        "name": "test12"
      },
      "createdAt": "2024-07-25T16:08:41.230Z",
      "_id": "ed118281-5232-469e-aaf7-261d315c50f5"
    },
        "user_number": "9999999987"
      }

      group


      {
        "type": "send_group_message",
        "group_id": "16",
    "content": {
      "text": "Hello 1",
      "user": {
        "_id": "9879879879",
        "name": "test12"
      },
      "createdAt": "2024-07-25T16:08:41.230Z",
      "_id": "ed118281-5232-419e-aaf7-201d395c50f5"
    },
        "user_number": "9999999987"
      }

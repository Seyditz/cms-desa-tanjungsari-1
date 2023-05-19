import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "./firebase";

// Firebase
const storage = getStorage(app);

export async function uploadImageAsPromise(file, index) {
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const task_1 = await new Promise(function (resolve, reject) {
    //Upload file
    var task = uploadBytesResumable(storageRef, file);

    //Update progress bar
    task.on(
      "state_changed",
      function progress(snapshot) {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      function error(err) {
        reject(err);
      },
      function complete() {
        resolve(task);
      }
    );
  });
  const downloadURL = await getDownloadURL(task_1.ref);
  // console.log("Finished uploading file: " + fileName);
  return downloadURL;
}

export async function uploadFiles(files) {
  const urlList = []
  await Promise.all(
    files.map((file, i) => uploadImageAsPromise(file, i).then((url) => urlList.push(url)))
  );
  return urlList
}

export const deleteImage = (url) => {
  const desertRef = ref(storage, url);
  deleteObject(desertRef)
    .then(() => {
        console.log("image deleted")
    })
    .catch((error) => console.log("image not deleted"));
};

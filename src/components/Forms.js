import React, { useRef, useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImagesUploader from "react-images-upload";
import {
  faCalendarAlt,
  faEdit,
  faFileAlt,
  faSave,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFailure,
  fetchStart,
  fetchSuccess,
  resetUserInputData,
  setAllUserInputData,
  setUserInputData,
  showAlert,
} from "../redux/userListSlice";
import { userRequest } from "../utils/requestMethods";
import { useHistory, useLocation } from "react-router-dom";
import UserAlert from "../pages/components/UserAlert";

import * as postActions from "../redux/postSlice";
import * as umkmActions from "../redux/umkmSlice";
import { Editor } from "@tinymce/tinymce-react";
import NoImage from "../assets/img/no_image.jpg";
import {
  deleteImage,
  uploadFiles,
  uploadImageAsPromise,
} from "../utils/firebaseFunctions";
import { useEffect } from "react";
import Dropzone from "react-dropzone";

export const GeneralInfoForm = () => {
  const [birthday, setBirthday] = useState("");

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Also your last name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={
                          birthday ? moment(birthday).format("MM/DD/YYYY") : ""
                        }
                        placeholder="mm/dd/yyyy"
                        onFocus={openCalendar}
                        onChange={() => {}}
                      />
                    </InputGroup>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select defaultValue="0">
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@company.com"
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="+12-345 678 910"
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your home address"
                />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control required type="number" placeholder="No." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control required type="text" placeholder="City" />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select state</Form.Label>
                <Form.Select id="state" defaultValue="0">
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control required type="tel" placeholder="ZIP" />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Save All
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const UserProfileForm = () => {
  const loading = useSelector((state) => state.userList.loading);
  const [username, setUsername] = useState(
    useSelector((state) => state.user.currentUser.username)
  );
  const id = useSelector((state) => state.user.currentUser._id);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [formError, setFormError] = useState();
  const alert = useSelector((state) => state.userList.alert);
  const dispatch = useDispatch();

  const validate = () => {
    let err = {};

    if (username === "" || username === undefined) {
      err.username = "Username harus ada!";
    }
    if (oldPassword === "" || oldPassword === undefined) {
      err.oldPassword = "Password harus ada!";
    }
    if (newPassword !== confirmNewPassword) {
      err.confirmNewPassword = "Password tidak sama!";
    }

    setFormError({ ...err });
    return Object.keys(err).length < 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      const user = {
        id,
        username,
        oldPassword,
        password: newPassword || oldPassword,
      };

      console.log(oldPassword);

      const updateUser = async () => {
        try {
          dispatch(fetchStart());
          const res = await userRequest.post("/users/update", user);
          dispatch(fetchSuccess());
          dispatch(
            showAlert({
              username: res.data.username,
              variant: "warning",
              action: "Diubah",
              icon: faSave,
            })
          );
        } catch (err) {
          console.log(err);
          setFormError((old) => {
            return { ...old, oldPassword: "Password salah!" };
          });
          dispatch(fetchFailure());
        }
      };
      updateUser();
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        {alert?.action == "Diubah" && <UserAlert />}
        <Form onSubmit={handleSubmit}>
          <h5 className="mb-4 mt-2">Informasi Umum</h5>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan username"
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
                <span className="text-danger">{formError?.username}</span>
              </Form.Group>
            </Col>
          </Row>
          <h5 className="mb-4 mt-2">Autentikasi</h5>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="oldPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled={loading}
                />
                <span className="text-danger">{formError?.oldPassword}</span>
              </Form.Group>
            </Col>
          </Row>
          <h5 className="mb-4 mt-2">Ganti Password</h5>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="newPassword">
                <Form.Label>Password Baru</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan password baru"
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="confirmNewPassword">
                <Form.Label>Konfirmasi Password Baru</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ketik ulang password baru"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  disabled={loading}
                />
                <span className="text-danger">
                  {formError?.confirmNewPassword}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" disabled={loading}>
            <FontAwesomeIcon icon={faSave} className="me-2"></FontAwesomeIcon>
            Simpan Data
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const UserForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userList.userInputData);
  const loading = useSelector((state) => state.userList.loading);
  const [formError, setformError] = useState();
  const history = useHistory();

  const validate = () => {
    let err = {};

    if (userData.username === "" || userData.username === undefined) {
      err.username = "Username harus ada!";
    }
    if (userData.password === "" || userData.password === undefined) {
      err.password = "Password harus ada!";
    }
    if (userData.password !== userData.confirmPassword) {
      err.confirmPassword = "Password tidak sama!";
    }

    setformError({ ...err });
    return Object.keys(err).length < 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    console.log(isValid);

    if (isValid) {
      const { confirmPassword, ...postUserData } = userData;
      const createUser = async () => {
        try {
          dispatch(fetchStart());
          const res = await userRequest.post("/users/register", {
            ...postUserData,
          });
          dispatch(fetchSuccess());
          dispatch(
            showAlert({
              username: res.data.username,
              variant: "success",
              action: "Dibuat",
              icon: faUser,
            })
          );
          dispatch(resetUserInputData());
          history.push("/users");
        } catch (err) {
          dispatch(fetchFailure());
          console.log(err);
        }
      };
      createUser();
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Formulir Pembuatan User</h5>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Masukkan username"
                  onChange={(e) =>
                    dispatch(
                      setUserInputData({
                        key: "username",
                        value: e.target.value,
                      })
                    )
                  }
                  defaultValue={userData?.username}
                  disabled={loading}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Masukkan password"
                  onChange={(e) =>
                    dispatch(
                      setUserInputData({
                        key: "password",
                        value: e.target.value,
                      })
                    )
                  }
                  disabled={loading}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="confirmPassword">
                <Form.Label>Ketik ulang password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Ketik ulang password"
                  onChange={(e) =>
                    dispatch(
                      setUserInputData({
                        key: "confirmPassword",
                        value: e.target.value,
                      })
                    )
                  }
                  disabled={loading}
                />
                <span className="text-danger">
                  {formError?.confirmPassword}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" disabled={loading}>
            Buat User
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const PostForm = ({ isUpdate }) => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post.postInputData);
  const loading = useSelector((state) => state.post.loading);
  const [image, setImage] = useState();
  const [oldImage, setOldImage] = useState();
  const [formError, setformError] = useState();
  const history = useHistory();
  const editorRef = useRef(null);

  useEffect(() => {
    if (isUpdate) {
      const fetchPost = async () => {
        try {
          dispatch(postActions.fetchStart());
          const res = await userRequest.post("/posts/get-by-id", {
            id: postId,
          });
          setImage(res.data.image);
          setOldImage(res.data.image);
          dispatch(postActions.setInitialInputData(res.data));
          dispatch(postActions.fetchSuccess());
        } catch (err) {
          console.log(err);
          dispatch(postActions.fetchFailure());
        }
      };
      fetchPost();
    }
  }, []);

  const validate = () => {
    let err = {};

    if (postData.name === "" || postData.name === undefined) {
      err.name = "Nama post harus ada!";
    }
    if (
      postData.category === "Kategori" ||
      postData.category === undefined ||
      postData.category === ""
    ) {
      err.category = "Kategori harus ada!";
    }
    if (
      editorRef.current.getContent() === "" ||
      editorRef.current.getContent() === undefined
    ) {
      err.description = "Deskripsi post harus ada!";
    }
    if (image === "" || image === undefined) {
      err.image = "Gambar post harus ada!";
    }

    setformError({ ...err });
    return Object.keys(err).length < 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // dispatch description from TinyMCE
    dispatch(
      postActions.setPostInputData({
        key: "description",
        value: editorRef.current.getContent(),
      })
    );
    const isValid = validate();

    if (isValid) {
      const createPost = async () => {
        try {
          dispatch(postActions.fetchStart());
          const imageUrl = await uploadImageAsPromise(image);
          const newPost = {
            name: postData.name,
            category: postData.category,
            description: editorRef.current.getContent(),
            image: imageUrl,
          };
          const res = await userRequest.post("/posts/create", newPost);
          dispatch(postActions.fetchSuccess());
          dispatch(
            postActions.showAlert({
              variant: "success",
              action: "Dibuat",
              icon: faFileAlt,
            })
          );
          dispatch(postActions.resetPostInputData());
          history.push("/posts");
        } catch (err) {
          dispatch(postActions.fetchFailure());
          console.log(err);
        }
      };
      const updatePost = async () => {
        try {
          dispatch(postActions.fetchStart());
          let imageUrl = "";
          if (oldImage == image) {
            imageUrl = oldImage;
          } else {
            deleteImage(oldImage);
            imageUrl = await uploadImageAsPromise(image);
          }
          const updatedPost = {
            name: postData.name,
            category: postData.category,
            description: editorRef.current.getContent(),
            image: imageUrl,
          };
          console.log(updatedPost);
          const res = await userRequest.post("/posts/update", {
            id: postId,
            ...updatedPost,
          });
          dispatch(
            postActions.showAlert({
              variant: "warning",
              action: "Diedit",
              icon: faEdit,
            })
          );
          dispatch(postActions.fetchSuccess());
          dispatch(postActions.resetPostInputData());
          history.push("/posts");
        } catch (error) {
          console.log(error);
          dispatch(postActions.fetchFailure());
        }
      };
      if (!isUpdate) {
        createPost();
      } else {
        updatePost();
      }
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">
          Formulir {!isUpdate ? "Pembuatan" : "Pengubahan"} Post
        </h5>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="username">
                <Form.Label>Nama Post</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama post"
                  onChange={(e) =>
                    dispatch(
                      postActions.setPostInputData({
                        key: "name",
                        value: e.target.value,
                      })
                    )
                  }
                  defaultValue={postData?.name}
                  disabled={loading}
                />
                <span className="text-danger">{formError?.name}</span>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="category">
                <Form.Label>Kategori</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan kategori"
                  onChange={(e) =>
                    dispatch(
                      postActions.setPostInputData({
                        key: "category",
                        value: e.target.value,
                      })
                    )
                  }
                  defaultValue={postData?.category}
                  disabled={loading}
                />
                <span className="text-danger">{formError?.category}</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Editor
                disabled={loading}
                initialValue={postData?.description}
                apiKey="mg0s3kuoilyubeq38ugeohe07v7139yg9hpyrmoit6wp4b3c"
                // onKeyUp={(e) => {
                //   dispatch(
                //     postActions.setPostInputData({
                //       key: "description",
                //       value: editorRef.current.getContent(),
                //     })
                //   );
                // }}
                onInit={(evt, editor) => (editorRef.current = editor)}
              />
              <span className="text-danger">{formError?.description}</span>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3">
              <Form.Group id="uploadImage">
                <Form.Label>Gambar</Form.Label>
                <Row>
                  <Col md={6} className="mb-3">
                    <img
                      src={postData?.image || NoImage}
                      className="img-thumbnail"
                    ></img>
                  </Col>
                </Row>
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    dispatch(
                      postActions.setPostInputData({
                        key: "image",
                        value: URL.createObjectURL(e.target.files[0]),
                      })
                    );
                    setImage(e.target.files[0]);
                  }}
                />
              </Form.Group>
              <span className="text-danger">{formError?.image}</span>
            </Col>
          </Row>
          <Button type="submit" disabled={loading}>
            {isUpdate ? "Edit Post" : "Buat Post"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export const UmkmForm = ({ isUpdate }) => {
  const location = useLocation();
  const umkmId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const umkmData = useSelector((state) => state.umkm.umkmInputData);
  const loading = useSelector((state) => state.umkm.loading);
  const [image, setImage] = useState();
  const [oldImage, setOldImage] = useState();
  const [formError, setformError] = useState();
  const history = useHistory();
  const editorRef = useRef(null);
  const [images, setImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);

  const handleDrop = (droppedFiles) => {
    setImages([...images, ...droppedFiles]);
  };

  const handleUpload = (files, urls) => {
    // const urlList = []
    // images.map((image) => urlList.push(URL.createObjectURL(image)))
    setImages(files)
    // setDisplayedImages(urlList)
    // console.log(urlList)
    // setDisplayedImages(images);
    // setDisplayedImages(urls);
    // console.log(files);
    // console.log(urls);
  };

  const handleRemove = (index) => {
    console.log("haloo");
    // setImages(images.filter((_, i) => i !== index));
    // setDisplayedImages(displayedImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (isUpdate) {
      const fetchUmkm = async () => {
        try {
          dispatch(umkmActions.fetchStart());
          const res = await userRequest.post("/umkm/get-by-id", {
            id: umkmId,
          });
          setDisplayedImages(res.data.image);
          // setOldImage(res.data.image);
          dispatch(umkmActions.setInitialInputData(res.data));
          dispatch(umkmActions.fetchSuccess());
        } catch (err) {
          console.log(err);
          dispatch(umkmActions.fetchFailure());
        }
      };
      fetchUmkm();
    }
  }, []);

  const validate = () => {
    let err = {};

    if (umkmData.name === "" || umkmData.name === undefined) {
      err.name = "Nama UMKM harus ada!";
    }
    if (
      umkmData.category === "Kategori" ||
      umkmData.category === undefined ||
      umkmData.category === ""
    ) {
      err.category = "Kategori harus ada!";
    }
    if (
      editorRef.current.getContent() === "" ||
      editorRef.current.getContent() === undefined
    ) {
      err.description = "Deskripsi UMKM harus ada!";
    }
    if (images === "" || images === undefined) {
      err.image = "Gambar UMKM harus ada!";
    }

    setformError({ ...err });
    return Object.keys(err).length < 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // dispatch description from TinyMCE
    dispatch(
      umkmActions.setUmkmInputData({
        key: "description",
        value: editorRef.current.getContent(),
      })
    );
    const isValid = validate();

    if (isValid) {
      const createUmkm = async () => {
        try {
          dispatch(umkmActions.fetchStart());
          const imageUrls = await uploadFiles(images);
          const newUmkm = {
            name: umkmData.name,
            category: umkmData.category,
            description: editorRef.current.getContent(),
            image: imageUrls,
          };
          const res = await userRequest.post("/umkm/create", newUmkm);
          dispatch(umkmActions.fetchSuccess());
          dispatch(
            umkmActions.showAlert({
              variant: "success",
              action: "Dibuat",
              icon: faFileAlt,
            })
          );
          dispatch(umkmActions.resetUmkmInputData());
          history.push("/umkm");
        } catch (err) {
          dispatch(umkmActions.fetchFailure());
          console.log(err);
        }
      };
      const updateUmkm = async () => {
        try {
          dispatch(umkmActions.fetchStart());
          let imageUrl = "";
          if (oldImage == images) {
            imageUrl = oldImage;
          } else {
            // deleteImage(oldImage);
            imageUrl = await uploadImageAsPromise(image);
          }
          const updatedUmkm = {
            name: umkmData.name,
            category: umkmData.category,
            description: editorRef.current.getContent(),
            image: imageUrl,
          };
          console.log(updatedUmkm);
          const res = await userRequest.post("/umkm/update", {
            id: umkmId,
            ...updatedUmkm,
          });
          dispatch(
            umkmActions.showAlert({
              variant: "warning",
              action: "Diedit",
              icon: faEdit,
            })
          );
          dispatch(umkmActions.fetchSuccess());
          dispatch(umkmActions.resetUmkmInputData());
          history.push("/umkm");
        } catch (error) {
          console.log(error);
          dispatch(umkmActions.fetchFailure());
        }
      };
      if (!isUpdate) {
        createUmkm();
      } else {
        updateUmkm();
      }
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">
          Formulir {!isUpdate ? "Pembuatan" : "Pengubahan"} UMKM
        </h5>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="username">
                <Form.Label>Nama UMKM</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama UMKM"
                  onChange={(e) =>
                    dispatch(
                      umkmActions.setUmkmInputData({
                        key: "name",
                        value: e.target.value,
                      })
                    )
                  }
                  defaultValue={umkmData?.name}
                  disabled={loading}
                />
                <span className="text-danger">{formError?.name}</span>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="category">
                <Form.Label>Kategori</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan kategori"
                  onChange={(e) =>
                    dispatch(
                      umkmActions.setUmkmInputData({
                        key: "category",
                        value: e.target.value,
                      })
                    )
                  }
                  defaultValue={umkmData?.category}
                  disabled={loading}
                />
                <span className="text-danger">{formError?.category}</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Editor
                disabled={loading}
                initialValue={umkmData?.description}
                apiKey="mg0s3kuoilyubeq38ugeohe07v7139yg9hpyrmoit6wp4b3c"
                // onKeyUp={(e) => {
                //   dispatch(
                //     umkmActions.setUmkmInputData({
                //       key: "description",
                //       value: editorRef.current.getContent(),
                //     })
                //   );
                // }}
                onInit={(evt, editor) => (editorRef.current = editor)}
              />
              <span className="text-danger">{formError?.description}</span>
            </Col>
          </Row>
          <Row>
            <Col className="mb-3">
              <Form.Label>{isUpdate ? "Gambar Baru" : "Gambar"}</Form.Label>
              <Row>
                <ImagesUploader
                  // buttonClassName="btn btn-warning disabled"
                  withPreview={true}
                  buttonText="Pilih Gambar"
                  onChange={handleUpload}
                  imgExtension={[".jpg", ".png", ".jpeg", ".HEIC"]}
                  maxFileSize={5242880}
                  withLabel={false}
                  singleImage={false}
                  defaultImages={images.map((image) => URL.createObjectURL(image))}
                  disabled={true}
                />
              </Row>
              <span className="text-danger">{formError?.image}</span>
            </Col>
          </Row>
          <Button type="submit" disabled={loading}>
            {isUpdate ? "Edit UMKM" : "Buat UMKM"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

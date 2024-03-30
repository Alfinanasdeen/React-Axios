import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
    website: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(API_URL)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditUser = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: { ...user.address },
      company: { ...user.company },
      website: user.website,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address")) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name.split(".")[1]]: value,
        },
      });
    } else if (name.startsWith("company")) {
      setFormData({
        ...formData,
        company: {
          ...formData.company,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      axios
        .put(`${API_URL}/${formData.id}`, formData)
        .then(() => {
          const updatedUsers = users.map((user) => {
            if (user.id === formData.id) {
              return formData;
            }
            return user;
          });
          setUsers(updatedUsers);
          setFormData({
            id: null,
            name: "",
            email: "",
            phone: "",
            address: {
              street: "",
              suite: "",
              city: "",
              zipcode: "",
            },
            company: {
              name: "",
              catchPhrase: "",
              bs: "",
            },
            website: "",
          });
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      axios
        .post(API_URL, formData)
        .then((response) => {
          setUsers([...users, response.data]);
          setFormData({
            id: null,
            name: "",
            email: "",
            phone: "",
            address: {
              street: "",
              suite: "",
              city: "",
              zipcode: "",
            },
            company: {
              name: "",
              catchPhrase: "",
              bs: "",
            },
            website: "",
          });
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }
  };

  return (
    <div className="container">
      <h1>CRUD Application</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <fieldset className="form-group">
              <legend>Address</legend>
              <input
                type="text"
                name="address.street"
                placeholder="Street"
                value={formData.address.street}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.suite"
                placeholder="Suite"
                value={formData.address.suite}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.city"
                placeholder="City"
                value={formData.address.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.zipcode"
                placeholder="Zipcode"
                value={formData.address.zipcode}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <legend>Company</legend>
              <input
                type="text"
                name="company.name"
                placeholder="Company Name"
                value={formData.company.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="company.catchPhrase"
                placeholder="Catch Phrase"
                value={formData.company.catchPhrase}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="company.bs"
                placeholder="BS"
                value={formData.company.bs}
                onChange={handleChange}
                required
              />
            </fieldset>
            <div className="form-group">
              <input
                type="text"
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">
              {formData.id ? "Update User" : "Add User"}
            </button>
          </form>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="user">
                <div>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <div>
                    <strong>Address:</strong>
                    <div style={{ paddingLeft: "20px" }}>
                      {" "}
                      {/* Adjust indentation */}
                      <p>
                        <strong>Street:</strong> {user.address.street}
                      </p>
                      <p>
                        <strong>Suite:</strong> {user.address.suite}
                      </p>
                      <p>
                        <strong>City:</strong> {user.address.city}
                      </p>
                      <p>
                        <strong>Zipcode:</strong> {user.address.zipcode}
                      </p>
                    </div>
                  </div>
                  <div>
                    <strong>Company:</strong>
                    <div style={{ paddingLeft: "20px" }}>
                      {" "}
                      {/* Adjust indentation */}
                      <p>
                        <strong>Name:</strong> {user.company.name}
                      </p>
                      <p>
                        <strong>Catch Phrase:</strong>{" "}
                        {user.company.catchPhrase}
                      </p>
                      <p>
                        <strong>BS:</strong> {user.company.bs}
                      </p>
                    </div>
                  </div>
                  <p>
                    <strong>Website:</strong> {user.website}
                  </p>
                </div>
                <div className="user-actions">
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

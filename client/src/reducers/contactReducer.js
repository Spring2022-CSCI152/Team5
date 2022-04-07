const initialState = [
  // { id: 0, name: "Raman Sharma", Level:  " 20", Progress: "Master" },
  // { id: 1, name: "Test Name", Level:  " 25", Progress: "Master" },
];

export const contactReducer = (state = initialState , action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;
    case "DELETE_CONTACT":
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;
    case "UPDATE_CONTACT":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state;
    case "RESET_CONTACT":
      state = [{ name: null, Level: null, Progress: null }];
      return state;
    default:
      return state;
  }
};
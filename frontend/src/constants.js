const indiaStates = [
    { value: 1, label: "Andhra Pradesh" },
    { value: 2, label: "Arunachal Pradesh" },
    { value: 3, label: "Assam" },
    { value: 4, label: "Bihar" },
    { value: 5, label: "Chhattisgarh" },
    { value: 6, label: "Goa" },
    { value: 7, label: "Gujarat" },
    { value: 8, label: "Haryana" },
    { value: 9, label: "Himachal Pradesh" },
    { value: 10, label: "Jharkhand" },
    { value: 11, label: "Karnataka" },
    { value: 12, label: "Kerala" },
    { value: 13, label: "Madhya Pradesh" },
    { value: 14, label: "Maharashtra" },
    { value: 15, label: "Manipur" },
    { value: 16, label: "Meghalaya" },
    { value: 17, label: "Mizoram" },
    { value: 18, label: "Nagaland" },
    { value: 19, label: "Odisha" },
    { value: 20, label: "Punjab" },
    { value: 21, label: "Rajasthan" },
    { value: 22, label: "Sikkim" },
    { value: 23, label: "Tamil Nadu" },
    { value: 24, label: "Telangana" },
    { value: 25, label: "Tripura" },
    { value: 26, label: "Uttar Pradesh" },
    { value: 27, label: "Uttarakhand" },
    { value: 28, label: "West Bengal" },
    { value: 29, label: "Andaman and Nicobar Islands" },
    { value: 30, label: "Chandigarh" },
    { value: 31, label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: 32, label: "Lakshadweep" },
    { value: 33, label: "Delhi" },
    { value: 34, label: "Puducherry" }
];


const cities = [
    // Andhra Pradesh
    { state: 1, value: 1, label: "Visakhapatnam" },
    { state: 1, value: 2, label: "Vijayawada" },
    { state: 1, value: 3, label: "Tirupati" },
    { state: 1, value: 4, label: "Guntur" },
    { state: 1, value: 5, label: "Nellore" },
    { state: 1, value: 6, label: "Kakinada" },
    { state: 1, value: 7, label: "Rajahmundry" },
    { state: 1, value: 8, label: "Anantapur" },
    { state: 1, value: 9, label: "Eluru" },
    { state: 1, value: 10, label: "Ongole" },

    // Arunachal Pradesh
    { state: 2, value: 11, label: "Itanagar" },
    { state: 2, value: 12, label: "Naharlagun" },
    { state: 2, value: 13, label: "Pasighat" },
    { state: 2, value: 14, label: "Tezpur" },
    { state: 2, value: 15, label: "Bomdila" },

    // Assam
    { state: 3, value: 16, label: "Guwahati" },
    { state: 3, value: 17, label: "Dibrugarh" },
    { state: 3, value: 18, label: "Silchar" },
    { state: 3, value: 19, label: "Jorhat" },
    { state: 3, value: 20, label: "Nagaon" },
    { state: 3, value: 21, label: "Karimganj" },
    { state: 3, value: 22, label: "Tinsukia" },
    { state: 3, value: 23, label: "Haflong" },

    // Bihar
    { state: 4, value: 24, label: "Patna" },
    { state: 4, value: 25, label: "Gaya" },
    { state: 4, value: 26, label: "Bhagalpur" },
    { state: 4, value: 27, label: "Muzzafarpur" },
    { state: 4, value: 28, label: "Purnia" },
    { state: 4, value: 29, label: "Arrah" },
    { state: 4, value: 30, label: "Chapra" },
    { state: 4, value: 31, label: "Darbhanga" },
    { state: 4, value: 32, label: "Kishanganj" },

    // Chhattisgarh
    { state: 5, value: 33, label: "Raipur" },
    { state: 5, value: 34, label: "Bilaspur" },
    { state: 5, value: 35, label: "Korba" },
    { state: 5, value: 36, label: "Durg" },
    { state: 5, value: 37, label: "Jagdalpur" },
    { state: 5, value: 38, label: "Raigarh" },
    { state: 5, value: 39, label: "Rajnandgaon" },

    // Goa
    { state: 6, value: 40, label: "Panaji" },
    { state: 6, value: 41, label: "Margao" },
    { state: 6, value: 42, label: "Vasco da Gama" },
    { state: 6, value: 43, label: "Mapusa" },
    { state: 6, value: 44, label: "Ponda" },

    // Gujarat
    { state: 7, value: 45, label: "Ahmedabad" },
    { state: 7, value: 46, label: "Surat" },
    { state: 7, value: 47, label: "Vadodara" },
    { state: 7, value: 48, label: "Rajkot" },
    { state: 7, value: 49, label: "Gandhinagar" },
    { state: 7, value: 50, label: "Bhavnagar" },
    { state: 7, value: 51, label: "Junagadh" },
    { state: 7, value: 52, label: "Amreli" },
    { state: 7, value: 53, label: "Anand" },
    { state: 7, value: 54, label: "Navsari" },

    // Haryana
    { state: 8, value: 55, label: "Gurugram" },
    { state: 8, value: 56, label: "Faridabad" },
    { state: 8, value: 57, label: "Panipat" },
    { state: 8, value: 58, label: "Hisar" },
    { state: 8, value: 59, label: "Ambala" },
    { state: 8, value: 60, label: "Karnal" },
    { state: 8, value: 61, label: "Yamunanagar" },

    // Himachal Pradesh
    { state: 9, value: 62, label: "Shimla" },
    { state: 9, value: 63, label: "Dharamshala" },
    { state: 9, value: 64, label: "Solan" },
    { state: 9, value: 65, label: "Mandi" },
    { state: 9, value: 66, label: "Kullu" },
    { state: 9, value: 67, label: "Bilaspur" },

    // Jharkhand
    { state: 10, value: 68, label: "Ranchi" },
    { state: 10, value: 69, label: "Jamshedpur" },
    { state: 10, value: 70, label: "Dhanbad" },
    { state: 10, value: 71, label: "Bokaro" },
    { state: 10, value: 72, label: "Deoghar" },
    { state: 10, value: 73, label: "Giridih" },
    { state: 10, value: 74, label: "Hazaribagh" },

    // Karnataka
    { state: 11, value: 75, label: "Bengaluru" },
    { state: 11, value: 76, label: "Mysuru" },
    { state: 11, value: 77, label: "Hubballi" },
    { state: 11, value: 78, label: "Belagavi" },
    { state: 11, value: 79, label: "Tumakuru" },
    { state: 11, value: 80, label: "Udupi" },
    { state: 11, value: 81, label: "Dakshina Kannada" },
    { state: 11, value: 82, label: "Chitradurga" },

    // Kerala
    { state: 12, value: 83, label: "Kochi" },
    { state: 12, value: 84, label: "Thiruvananthapuram" },
    { state: 12, value: 85, label: "Kollam" },
    { state: 12, value: 86, label: "Kottayam" },
    { state: 12, value: 87, label: "Alappuzha" },
    { state: 12, value: 88, label: "Palakkad" },
    { state: 12, value: 89, label: "Kannur" },
    { state: 12, value: 90, label: "Wayanad" },

    // Madhya Pradesh
    { state: 13, value: 91, label: "Bhopal" },
    { state: 13, value: 92, label: "Indore" },
    { state: 13, value: 93, label: "Gwalior" },
    { state: 13, value: 94, label: "Jabalpur" },
    { state: 13, value: 95, label: "Ujjain" },
    { state: 13, value: 96, label: "Sagar" },
    { state: 13, value: 97, label: "Satna" },
    { state: 13, value: 98, label: "Rewa" },

    // Maharashtra
    { state: 14, value: 99, label: "Mumbai" },
    { state: 14, value: 100, label: "Pune" },
    { state: 14, value: 101, label: "Nagpur" },
    { state: 14, value: 102, label: "Nashik" },
    { state: 14, value: 103, label: "Aurangabad" },
    { state: 14, value: 104, label: "Thane" },
    { state: 14, value: 105, label: "Kolhapur" },
    { state: 14, value: 106, label: "Jalgaon" },
    { state: 14, value: 107, label: "Solapur" },

    // Manipur
    { state: 15, value: 108, label: "Imphal" },
    { state: 15, value: 109, label: "Thoubal" },
    { state: 15, value: 110, label: "Churachandpur" },
    { state: 15, value: 111, label: "Kakching" },

    // Meghalaya
    { state: 16, value: 112, label: "Shillong" },
    { state: 16, value: 113, label: "Tura" },
    { state: 16, value: 114, label: "Jowai" },

    // Mizoram
    { state: 17, value: 115, label: "Aizawl" },
    { state: 17, value: 116, label: "Lunglei" },
    { state: 17, value: 117, label: "Champhai" },

    // Nagaland
    { state: 18, value: 118, label: "Kohima" },
    { state: 18, value: 119, label: "Dimapur" },
    { state: 18, value: 120, label: "Mokokchung" },

    // Odisha
    { state: 19, value: 121, label: "Bhubaneswar" },
    { state: 19, value: 122, label: "Cuttack" },
    { state: 19, value: 123, label: "Berhampur" },
    { state: 19, value: 124, label: "Rourkela" },
    { state: 19, value: 125, label: "Balasore" },
    { state: 19, value: 126, label: "Sambalpur" },
    { state: 19, value: 127, label: "Koraput" },

    // Punjab
    { state: 20, value: 128, label: "Chandigarh" },
    { state: 20, value: 129, label: "Amritsar" },
    { state: 20, value: 130, label: "Ludhiana" },
    { state: 20, value: 131, label: "Jalandhar" },
    { state: 20, value: 132, label: "Patiala" },
    { state: 20, value: 133, label: "Mohali" },

    // Rajasthan
    { state: 21, value: 134, label: "Jaipur" },
    { state: 21, value: 135, label: "Udaipur" },
    { state: 21, value: 136, label: "Kota" },
    { state: 21, value: 137, label: "Ajmer" },
    { state: 21, value: 138, label: "Bikaner" },
    { state: 21, value: 139, label: "Jodhpur" },
    { state: 21, value: 140, label: "Sikar" },

    // Sikkim
    { state: 22, value: 141, label: "Gangtok" },
    { state: 22, value: 142, label: "Mangan" },

    // Tamil Nadu
    { state: 23, value: 143, label: "Chennai" },
    { state: 23, value: 144, label: "Coimbatore" },
    { state: 23, value: 145, label: "Madurai" },
    { state: 23, value: 146, label: "Tiruchirappalli" },
    { state: 23, value: 147, label: "Salem" },
    { state: 23, value: 148, label: "Erode" },
    { state: 23, value: 149, label: "Tuticorin" },
    { state: 23, value: 150, label: "Vellore" },

    // Telangana
    { state: 24, value: 151, label: "Hyderabad" },
    { state: 24, value: 152, label: "Warangal" },
    { state: 24, value: 153, label: "Karimnagar" },
    { state: 24, value: 154, label: "Nizamabad" },
    { state: 24, value: 155, label: "Khammam" },
    { state: 24, value: 156, label: "Mahbubnagar" },

    // Tripura
    { state: 25, value: 157, label: "Agartala" },
    { state: 25, value: 158, label: "Udaipur" },
    { state: 25, value: 159, label: "Kailashahar" },
    { state: 25, value: 160, label: "Dharmanagar" },

    // Uttar Pradesh
    { state: 26, value: 161, label: "Lucknow" },
    { state: 26, value: 162, label: "Kanpur" },
    { state: 26, value: 163, label: "Agra" },
    { state: 26, value: 164, label: "Varanasi" },
    { state: 26, value: 165, label: "Meerut" },
    { state: 26, value: 166, label: "Allahabad" },
    { state: 26, value: 167, label: "Bareilly" },
    { state: 26, value: 168, label: "Ghaziabad" },
    { state: 26, value: 169, label: "Moradabad" },
    { state: 26, value: 170, label: "Rampur" },

    // Uttarakhand
    { state: 27, value: 171, label: "Dehradun" },
    { state: 27, value: 172, label: "Haridwar" },
    { state: 27, value: 173, label: "Roorkee" },
    { state: 27, value: 174, label: "Nainital" },
    { state: 27, value: 175, label: "Haldwani" },

    // West Bengal
    { state: 28, value: 176, label: "Kolkata" },
    { state: 28, value: 177, label: "Siliguri" },
    { state: 28, value: 178, label: "Durgapur" },
    { state: 28, value: 179, label: "Asansol" },
    { state: 28, value: 180, label: "Burdwan" },
    { state: 28, value: 181, label: "Howrah" },
    { state: 28, value: 182, label: "Kalyani" },
    { state: 28, value: 183, label: "Jalpaiguri" },

    // Andaman and Nicobar Islands
    { state: 29, value: 184, label: "Port Blair" },

    // Dadra and Nagar Haveli and Daman and Diu
    { state: 30, value: 185, label: "Daman" },
    { state: 30, value: 186, label: "Silvassa" },

    // Lakshadweep
    { state: 31, value: 187, label: "Kavaratti" },

    // Delhi
    { state: 32, value: 188, label: "New Delhi" },
    { state: 32, value: 189, label: "Delhi" },

    // Puducherry
    { state: 33, value: 190, label: "Puducherry" },
    { state: 33, value: 191, label: "Karaikal" },
    { state: 33, value: 192, label: "Yanam" },
    { state: 33, value: 193, label: "Mahe" }
];

export { indiaStates, cities };
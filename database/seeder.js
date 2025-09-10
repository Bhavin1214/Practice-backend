// seeders/countrySeeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Country from "./model/countryModel.js";

dotenv.config();

const countries = [
  { name: "India", code: "IN", dialCode: "+91", currency: "INR" },
  { name: "United States", code: "US", dialCode: "+1", currency: "USD" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", currency: "GBP" },
  { name: "Canada", code: "CA", dialCode: "+1", currency: "CAD" },
  { name: "Australia", code: "AU", dialCode: "+61", currency: "AUD" },
  { name: "Germany", code: "DE", dialCode: "+49", currency: "EUR" },
  { name: "France", code: "FR", dialCode: "+33", currency: "EUR" },
  { name: "Italy", code: "IT", dialCode: "+39", currency: "EUR" },
  { name: "Spain", code: "ES", dialCode: "+34", currency: "EUR" },
  { name: "Brazil", code: "BR", dialCode: "+55", currency: "BRL" },
  { name: "Mexico", code: "MX", dialCode: "+52", currency: "MXN" },
  { name: "Argentina", code: "AR", dialCode: "+54", currency: "ARS" },
  { name: "Russia", code: "RU", dialCode: "+7", currency: "RUB" },
  { name: "China", code: "CN", dialCode: "+86", currency: "CNY" },
  { name: "Japan", code: "JP", dialCode: "+81", currency: "JPY" },
  { name: "South Korea", code: "KR", dialCode: "+82", currency: "KRW" },
  { name: "Singapore", code: "SG", dialCode: "+65", currency: "SGD" },
  { name: "Malaysia", code: "MY", dialCode: "+60", currency: "MYR" },
  { name: "Thailand", code: "TH", dialCode: "+66", currency: "THB" },
  { name: "Indonesia", code: "ID", dialCode: "+62", currency: "IDR" },
  { name: "Philippines", code: "PH", dialCode: "+63", currency: "PHP" },
  { name: "Vietnam", code: "VN", dialCode: "+84", currency: "VND" },
  { name: "Turkey", code: "TR", dialCode: "+90", currency: "TRY" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", currency: "SAR" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", currency: "AED" },
  { name: "Qatar", code: "QA", dialCode: "+974", currency: "QAR" },
  { name: "South Africa", code: "ZA", dialCode: "+27", currency: "ZAR" },
  { name: "Egypt", code: "EG", dialCode: "+20", currency: "EGP" },
  { name: "Nigeria", code: "NG", dialCode: "+234", currency: "NGN" },
  { name: "Kenya", code: "KE", dialCode: "+254", currency: "KES" },
  { name: "Ghana", code: "GH", dialCode: "+233", currency: "GHS" },
  { name: "Ethiopia", code: "ET", dialCode: "+251", currency: "ETB" },
  { name: "Pakistan", code: "PK", dialCode: "+92", currency: "PKR" },
  { name: "Bangladesh", code: "BD", dialCode: "+880", currency: "BDT" },
  { name: "Sri Lanka", code: "LK", dialCode: "+94", currency: "LKR" },
  { name: "Nepal", code: "NP", dialCode: "+977", currency: "NPR" },
  { name: "Afghanistan", code: "AF", dialCode: "+93", currency: "AFN" },
  { name: "Iran", code: "IR", dialCode: "+98", currency: "IRR" },
  { name: "Iraq", code: "IQ", dialCode: "+964", currency: "IQD" },
  { name: "Israel", code: "IL", dialCode: "+972", currency: "ILS" },
  { name: "Jordan", code: "JO", dialCode: "+962", currency: "JOD" },
  { name: "Lebanon", code: "LB", dialCode: "+961", currency: "LBP" },
  { name: "Kuwait", code: "KW", dialCode: "+965", currency: "KWD" },
  { name: "Oman", code: "OM", dialCode: "+968", currency: "OMR" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", currency: "NZD" },
  { name: "Sweden", code: "SE", dialCode: "+46", currency: "SEK" },
  { name: "Norway", code: "NO", dialCode: "+47", currency: "NOK" },
  { name: "Denmark", code: "DK", dialCode: "+45", currency: "DKK" },
  { name: "Switzerland", code: "CH", dialCode: "+41", currency: "CHF" },
  { name: "Netherlands", code: "NL", dialCode: "+31", currency: "EUR" },
  { name: "Belgium", code: "BE", dialCode: "+32", currency: "EUR" },
]

const seedCountries = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/TASK3", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected...");

        // Clear old data
        await Country.deleteMany();

        // Insert new data
        await Country.insertMany(countries);

        console.log("Countries seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedCountries();

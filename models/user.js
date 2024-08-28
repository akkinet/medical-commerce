import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    name: { type: String },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    zipCode: { type: String,
        validate: {
            validator: function isValidZipCode(zipCode) {
                const zipCodePattern = /^[1-9][0-9]{5}$/;
                return zipCodePattern.test(zipCode);
            }
        },
        message: props => `${props.value} is not a valid zipcode!`
     },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); // Regular expression for basic email validation
            },
            message: props => `${props.value} is not a valid email address!`

        }
    },
    image: String,
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^((\+91|91|0)[\- ]{0,1})?[6789]\d{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Password strength checks (adjust as needed):
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(value);
            },
            message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }
    },
    address: String,
    verified: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if(this.firstName && this.lastName)
        this.name = `${this.firstName} ${this.lastName}`;

    // Hash the password before saving to the database
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // 10 salt rounds (adjust as needed)
    }
    next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);

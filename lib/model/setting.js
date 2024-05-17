import mongoose from 'mongoose';

const appSettingModel = new mongoose.Schema({
    app_name: {
        type: String,
    },
    app_name_ar: {
        type: String,
    },
    app_logo: {
        type: String,
    },
    about_app_en: {
        type: String,
    },
    about_app_ar: {
        type: String,
    },
    youtube_link: {
        type: String,
    },
    facebook_link: {
        type: String,
    },

});

export const AppSetting=mongoose.models.appSettings || mongoose.model("appSettings",appSettingModel)
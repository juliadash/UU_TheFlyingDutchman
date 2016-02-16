/**
 * Created by Mike on 2/12/2016.
 */

var _language = "en";

function changeLanguage(language) {
    _language = language;
}

// define translations
var welcome_message_homepage = {
    en: "Welcome",
    sv: "Välkomna"
};

var introduction_text_homepage = {
    en: "English text...",
    sv: "French text..."
};

// etc ...

// get translation for current language
//alert(hello_message_homepage[_lang]);
//alert(introduction_text_homepage[_lang]);

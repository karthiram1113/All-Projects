document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3
    });

    document.querySelectorAll('.hero-text,.mission-text').forEach(el => {
        observer.observe(el);
    });

});
 $(document).ready(function () {
        $("#phone").intlTelInput({
            initialCountry: "auto",
            preferredCountries: ['sa', 'ae', 'qa', 'om', 'bh', 'kw', 'ma', 'in'],
            separateDialCode: true, // this shows flag and dial code outside input
            nationalMode: false,
            autoPlaceholder: "polite",
            formatOnDisplay: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.min.js",
            geoIpLookup: function (callback) {
                $.get("https://ipinfo.io?token=your_token_here", function () { }, "jsonp").always(function (resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "us";
                    callback(countryCode);
                });
            }
        });
  });

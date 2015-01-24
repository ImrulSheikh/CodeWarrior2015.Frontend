var helper = {
	showLoginMenu: function(){
		jQuery('#login-id').hide();
        jQuery('#logout-id').show();
        jQuery('#user-id').show();
        jQuery('#account-id').show();
        jQuery('#account-id a').attr('href', '#/account/' + localStorage.userName);
        jQuery('#user-id a').text(localStorage.userName);
	},

	showLogoutMenu: function(){
		jQuery('#login-id').show();
        jQuery('#logout-id').hide();
        jQuery('#user-id').hide();
        jQuery('#account-id').hide();
	},

	logout: function(){
		localStorage.accessToken = null;
		localStorage.userName = null;
		jQuery('#account-id a').attr('href', '#/account/');
        helper.showLogoutMenu();
        window.location = 'http://localhost:8000/#/home';
	},

	checkLoginStatus: function(){
		if (localStorage.accessToken && localStorage.accessToken != 'null') {
            helper.showLoginMenu();
        } else {
            helper.showLogoutMenu();
        }
	}
};

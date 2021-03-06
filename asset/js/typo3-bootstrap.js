$.fn.navigationBar = function() {
    var parent = $(this);

    parent.each((index, el) => {
        var self = $(el);

        self.on('hide.bs.collapse', function () {
            $('.navbar').removeClass('show');
        });
        self.on('show.bs.collapse', function () {
            parent.trigger('collapse.navigation.bar', index);

            $('.navbar').addClass('show');

            var _input = self.find('input[name="tx_indexedsearch_pi2[search][sword]"]');
            if(_input.length) {
                setTimeout(function () {
                    _input.focus();
                }, 400)
            }
        });
        self.on('collapse.navigation.bar', function(e, targetIndex){
            if(targetIndex !== index) {
                self.collapse('hide');
            }
        });
    });
};
window.Statemanager.attach('navbar-events', function(){
    /**
     * Typo3 Bootstrap
     */
    $('#navbarResponsive,#collapseSearch').navigationBar();
});

'use strict';
angular.module('GenesisApp').controller('inicioempresasController', ['$scope', function ($scope) {
    angular.element(document).ready(function () {
        $(".collapsible-header").addClass("active");
        $(".collapsible").collapsible({ accordion: false });
    });

    $scope.plusSlides = function (n) {
        $scope.showSlides(slideIndex += n);
    }

    $scope.currentSlide = function (n) {
        $scope.showSlides(slideIndex = n);
    }

    $scope.imgs = {
        url: "assets/images/video-img.jpeg",
        url: "assets/images/sarlaft.png",
        url: "assets/images/ips-slides.png"
    }

    $scope.showSlides = function (n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    var slideIndex = 1;
    $scope.showSlides(slideIndex);

    $scope.verdocumento = function(nombredocumento) {
        window.open(
            "images/slider/empresas/"+nombredocumento+".pdf");
    }
}])

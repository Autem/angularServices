"use strict";

(function(){

    angular.module('app')
        .controller('BooksController', ['books', 'dataService', 'badgeService', '$q', '$cookies', '$cookieStore', '$log', '$route', BooksController] );

    function BooksController(books, dataService, badgeService, $q, $cookies, $cookieStore, $log, $route){
        var vm = this;
        vm.appName = books.appName;

       /* var booksPromise = dataService.getAllBooks();
        var readersPromise = dataService.getAllReaders();

        $q.all( [booksPromise, readersPromise] )
            .then(getAllDataSuccess)
            .catch(getAllDataError);

        function getAllDataSuccess(dataArray){
            vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[1];
        }

        function getAllDataError(reason){
            console.log(reason);
        }*/

        dataService.getAllBooks()
            .then(getBooksSuccess, null, getBooksNotification)
            .catch(errorCallback)
            .finally(getAllBooksComplete);

        function getBooksSuccess(books){
            vm.allBooks = books;
        }

        function getBooksNotification(notification){
            console.log('Promise Notification: ' + notification );
        }

        function errorCallback(errMsg) {
            console.log('Error Message: ' + errMsg );
        }

        function getAllBooksComplete(){
            console.log('getAllBooks has completed.');
        }

        dataService.getAllReaders()
            .then(getReadersSuccess)
            .catch(errorCallback)
            .finally(getAllReadersComplete);

        function getReadersSuccess(readers){
            vm.allReaders = readers;
        }

        function getAllReadersComplete(){
            console.log('getAllReaders has Completed');
        }

        vm.deleteBook = function(bookID){
            dataService.deleteBook(bookID)
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        };

        function deleteBookSuccess(message){
            $log.info(message);
            $route.reload();
        }

        function deleteBookError(errorMessage){
            $log.error(errorMessage);
        }

        vm.getBadge = badgeService.retrieveBadge;

        vm.favoriteBook = $cookies.favoriteBook;

        vm.lastEdited = $cookieStore.get('lastEdited');
    }
}());
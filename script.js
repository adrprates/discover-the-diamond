$(document).ready(function() {
    let score = 0;
    let rounds = 10;
    let diamondIndex;

    //inicia o jogo
    function startGame() {
        score = 0;
        rounds = 10;
        $('#score').text(score);
        $('#rounds').text(rounds);
        $('#message').text('Clique em uma pedra para começar!');
        shuffleRocks();
    }

    //mostra a mensagem de embaralhamento e esconde as pedras
    function showShufflingMessage() {
        $('.rocks').hide();
        $('#shufflingMessage').css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: $('.rocks').outerWidth(),
            height: $('.rocks').outerHeight(),
            margin: '0 auto'
        }).show();
    }

    //esconde a mensagem de embaralhamento e mostra as pedras
    function hideShufflingMessage() {
        $('#shufflingMessage').hide();
        $('.rocks').show();
    }

    //embaralha as pedras
    function shuffleRocks() {
        diamondIndex = Math.floor(Math.random() * 3);

        //reseta os estilos das pedras
        $('.rock').each(function() {
            $(this).css('background-color', '#3498db');
            $(this).removeClass('diamond'); // remove a classe diamond de todas as pedras
            $(this).css('background-image', "url('./images/rock.jpg')"); //define imagem padrão como rock.jpg
            $(this).css('background-size', 'cover');
        });

        //mostra a mensagem de embaralhamento
        showShufflingMessage();

        setTimeout(() => {
            hideShufflingMessage();
            $('.rock').on('click', checkGuess);
        }, 1000); // 1 segundo de embaralhamento
    }

    //verifica a escolha do jogador
    function checkGuess() {
        const selectedRockIndex = $(this).data('index');

        //remove os manipuladores de clique após a escolha
        $('.rock').off('click');

        if (selectedRockIndex === diamondIndex) {
            score += 10;
            $('#message').text('Você acertou!');

            //mostra a imagem do diamante na pedra correta
            $(this).css('background-image', "url('./images/diamond.jpg')");
            $(this).css('background-size', 'cover');
            $(this).addClass('diamond');
        } else {
            $('#message').text('Você errou! Tente novamente.');

            //mostra a imagem de ouro na pedra incorreta
            $(this).css('background-image', "url('./images/gold.jpg')");
            $(this).css('background-size', 'cover');
        }

        //apos a selecao, mostra todas as pedras com imagens
        $('.rock').each(function(index) {
            if (index === diamondIndex) {
                $(this).css('background-image', "url('./images/diamond.jpg')");
            } else {
                $(this).css('background-image', "url('./images/gold.jpg')");
            }
            $(this).css('background-size', 'cover');
        });

        rounds--;
        $('#score').text(score);
        $('#rounds').text(rounds);

        //verifica se o jogo ainda continua
        if (rounds > 0) {
            setTimeout(shuffleRocks, 2000);
        } else {
            $('#message').text(`Fim de jogo! Sua pontuação final é: ${score}`);
        }
    }

    //mostra o botao de reiniciar o jogo
    $('#startGame').on('click', function() {
        startGame();
    });

    //adiciona a mensagem de embaralhamento
    $('.rocks').after('<div id="shufflingMessage" style="display:none; text-align: center; font-size: 20px; color:rgb(217, 134, 255);">Embaralhando...</div>');

    //inicia o jogo
    startGame();
});
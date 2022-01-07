<template>
    <div class="home">
        <div class="home-wrapper">
            <h1>Pozdravljen Koronar!</h1>
            <h2>Uživaj v igri, spreminjaj nastavitve in si oglej svojo statistiko</h2>
        </div>

        <div class="body-wrapper">
            <h3>Igraj...</h3>
            <img src="../assets/igra1234.png">
            <h3>Spreminjaj nastavitve...</h3>
            <img src="../assets/nastavitve.png">
            <h3>Glej svojo statistiko...</h3>
            <img src="../assets/stats.png">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
}
</script>

<style scoped>
    .home {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    .home-wrapper {
        display: flex;
        flex-direction: column;
        background-image: url('../assets/run.jpg');
        background-repeat: repeat-y repeat-x;
        height: 40%;
        width: 100%;
    }

    .body-wrapper {
        height: 60%;
    }

    h1 {
        font-size: 70px;
        color: black;
        margin: 5px;
    }

    h2 {
        color: black;
        font-size: 30px;
    }

    img {
        width: 90%;
        height: 600px;
    }

    h3 {
        margin: 10px;
    }
</style>
<section id="loginPanel" class="login-page login-bg">
    <div class="login-mask"></div>
    <ul class="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <div class="row-fluid login-wrapper">
        <div class="span4 box">
            <div class="content-wrap">
                <h6>Pagium Log In</h6>
                <input class="span12" type="text" v-model="userName" placeholder="Your Account">
                <input class="span12" type="password" v-model="password" placeholder="Your Password">
                <div class="input-field col s12">
                    <a href="javascript:void(0)" class="btn waves-effect waves-light col s12" v-on:click="login">Login</a>
                </div>
            </div>
        </div>
    </div>
</section>
<header id="header" class="page-topbar">
    <!-- start header nav-->
    <div class="navbar-fixed">
        <nav class="navbar-color grey darken-3">
            <div class="nav-wrapper">
                <!--<a v-if="page == 'dash'" id="head-menu-btn" v-on:click="onMenu" class="menu-btn btn-floating waves-effect waves-light accent-4 tooltipped" data-position="down" data-delay="50" data-tooltip="菜单控制"><i class="fa fa-list"></i></a>-->
                <a href="javascript:void(0);" class="brand-logo">Pagium</a>
                <ul class="index-logo-left left hide-on-med-and-down">
                    <li>
                        <a href="javascript:void(0)" class="waves-effect waves-block waves-light chat-collapse tooltipped"  data-position="down" data-delay="50" data-tooltip="回到首页" v-on:click="onHome">
                            <i class="fa fa-home"></i>
                        </a>
                    </li>
                </ul>
                <ul class="index-logo-right center hide-on-med-and-down">
                    <template v-for="menu in nconfig.menus">
                        <li v-if="menu.hasChild" class="no-padding">
                            <a class="dropdown-button" href="javascript:void(0)" data-activates="{{menu.key}}"><i class="{{menu.icon}}"></i></a>
                            <ul id="{{menu.key}}" class="dropdown-content">
                                <li class="{{menu.isAct}}" v-for="child in menu.children">
                                <a href="{{child.url}}">{{child.name}}</a>
                                </li>
                            </ul>
                        </li>
                        <li v-else data-url="{{menu.url}}" class="bold {{menu.isAct}}">
                            <a data-url="{{menu.url}}" href="javascript:void(0)" class="waves-effect waves-block waves-light chat-collapse tooltipped" data-position="down" data-delay="50" data-tooltip="{{menu.name}}" v-on:click="onMenuBar">
                                <i data-url="{{menu.url}}" class="{{menu.icon}}"></i>
                            </a>
                        </li>
                    </template>
                </ul>
                <ul class="index-logo-right right hide-on-med-and-down">
                    <li v-on:click="onFull">
                        <a href="javascript:void(0);" class="waves-effect waves-block waves-light toggle-fullscreen tooltipped" data-position="down" data-delay="50" data-tooltip="全屏展示">
                            <i class="mdi-action-settings-overscan"></i>
                        </a>
                    </li>
                    <li v-on:click="logout">
                        <a href="javascript:void(0);" class="waves-effect waves-block waves-light toggle-fullscreen tooltipped" data-position="down" data-delay="50" data-tooltip="注销">
                            <i class="fa fa-sign-out fa-2x"></i>
                        </a>
                    </li>
                </ul>
                <!-- translation-button -->

                <!-- notifications-dropdown -->

            </div>
        </nav>
    </div>
    <!-- end header nav-->
</header>
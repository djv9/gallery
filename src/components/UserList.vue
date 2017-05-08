<template>
    <div class="table-user-container">
        <table class="table table-user">
            <thead>
                <th>name</th>
                <th>age</th>
                <th>group</th>
                <th>wholeObj</th>
            </thead>
            <tbody>
                <tr v-for='user in users'>
                    <td>{{user.name}}</td>
                    <td>{{user.age}}</td>
                    <td>{{user.group}}</td>
                    <td>{{user}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name : 'UserList',
        data(){
            var users = axios.get('http://localhost:3000/index').then(res => this.users = res.data)
            return {
                users : users
            }
        }
    }
</script>
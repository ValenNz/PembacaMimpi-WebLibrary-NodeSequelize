/* Imprt library express */
const express = require(`express`) // import express
const md5 = require(`md5`)      // Import md5 untuk password
const jwt = require(`jsonwebtoken`) // import jwt untuk authenticatiob
 
/* Import Model */
const adminModel = require(`../models/index`).admin

/* Functrion authenticating process */
const authenticate = async (request, response) => { // exports arrow fn
    /*
        req  : var yang berisi data request
        res  : var yang berisi data response dari end-point 
    */

    /* Mendefinisikan data dari request (menangkap) */
    let dataLogin = {
        username: request.body.username,
        password: md5(request.body.password)
    }

    /* cek data username dan password di meja admin */
    let dataAdmin = await adminModel.findOne({ where: dataLogin })

    /* jika admin data ada */
    if(dataAdmin){

        /* atur payload untuk menghasilkan token */
        let payload = JSON.stringify(dataAdmin) // stringfy() : payload harus berupa string. dataAdmin adalah objek, jadi kita harus mengubahnya menjadi string.
        
        let secret = `mokleters` // mendefinisikan kunci rahasia sebagai tanda tangan 

       /* Buat Token */
        let token = jwt.sign(payload, secret)

        /* Mengirimklan response */
        return response.json({
            success: true,
            logged: true,
            message: `Berhasil Authentication`,
            token: token,
            data: dataAdmin
        })
    }

    /* Jika data admin tidak ada */
    return response.json({
        success: false, 
        logged: false,
        message: `Authentication Failed. Invalid username or password`
    })
}

/*Function authroize (perizinan) */
const authorize = (request, response, next) => {
    /* Dapatkan nilai "Otorisasi" dari header permintaan */
    let headers = request.headers.authorization


    /* Mendapatkan token */
    let tokenKey = headers && headers.split(" ")[1] // Ketika menggunakan token untuk auth kita membagi 'header' untuk mendapatkan token dengan 'bearers tokenKey'

    /* Check token */
    if (tokenKey == null) {
        /* Mengembalikan response */
        return response.json({
            success: false,
            message: `Unauthorized User`
        })
    }

    /* Menetukan kunci otentikasi */
    let secret = `mokleters` // tentukan Kunci rahasia (sama dengan kunci rahasia dalam fungsi otentikasi)

    /* Verifikasi token dengan ktw */
    jwt.verify(tokenKey, secret, (error, user) => {
        /* check jika token error*/
        if (error) {
            return response.json({
                success: false,
                message: `Invalid token`
            })
        }
    })

    /* Jika tidak ada error lanjutkan ke controller */
    next()
}

module.exports = { authenticate, authorize } // exports modulde dupaya digunakan di file lain


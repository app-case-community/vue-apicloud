package gov.dalian.mesh.ui

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.os.Handler
import android.view.View
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import gov.dalian.mesh.R
import store.createapp.android.apicloud.WebPageModule

class MainActivity : AppCompatActivity(), View.OnClickListener {


    var handler: Handler? = null

    override fun onClick(v: View?) {

//        v?.let {
//            when (it.id) {
//                R.id.button -> {
//                    startActivity(Intent(this@MainActivity, WebPageModule::class.java))
//                }
//            }
//        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
        window.navigationBarColor = Color.parseColor("#1bb5d7")  // ActivityCompat.getColor(this, R.color.colorPrimary)
        handler = Handler()
        setContentView(R.layout.activity_main)
        handler?.postDelayed(Runnable {
            startActivity(Intent(this@MainActivity, WebPageModule::class.java))
            handler?.postDelayed(Runnable {
                finish()
            }, 1000)
        }, 500)
    }

    override fun onDestroy() {
        super.onDestroy()
        handler = null
    }
}

package gov.dalian.mesh

import android.app.Application
import store.createapp.android.apicloud.ApicloudStarer

class AcApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        ApicloudStarer.setup(this)
    }
}
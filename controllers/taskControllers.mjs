
import { task } from "../data/taskdata.mjs"
export const taskValidator={
    title:{
        notEmpty:{
            errorMessage:"title should be required"
        },

    custom:{
        options:(value)=>{
            const exictsTitle=task.find((u)=>u.title===value)
            if(exictsTitle){
                throw new err("Title already required")
            }
            return true
        }

    }
},
  description:{
    notEmpty:{
        errorMessage:"description should be required"
    }
  },
  status:{
    notEmpty:{
        errorMessage:"status should be required"
    }
  },
  userid:{
    notEmpty:{
        errorMessage:"userid must be required"
    }
  }

}

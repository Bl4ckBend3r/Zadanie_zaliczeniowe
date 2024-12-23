export function updateSkill() {
        const skills = document.querySelectorAll(".skill");
        skills.forEach(skill => {
          const skillName = skill.querySelector(".skills_info h4").textContent; 
          const yearsText = skill.querySelector(".skills_info p").textContent; 
          
          const years = parseInt(yearsText); 
          console.log(`Skill: ${skillName}, Years: ${years}`); 
      
          const dots = skill.querySelectorAll(".skills_info .rating span"); 
      
          dots.forEach((dot, index) => {
            if (index < years) {
              dot.classList.add("active"); 
            } else {
              dot.classList.remove("active"); 
            }
          });
        });
  }
  
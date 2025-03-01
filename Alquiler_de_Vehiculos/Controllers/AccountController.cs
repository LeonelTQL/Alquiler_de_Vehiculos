// Controllers/AccountController.cs
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

public class AccountController : Controller
{
    [HttpPost]
    public async Task<IActionResult> Login(string username, string password)
    {
        // Datos quemados para simular la autenticación
        var users = new[]
        {
            new { Username = "admin", Password = "admin123", Role = "admin" },
            new { Username = "empleado", Password = "empleado123", Role = "empleado" }
        };

        var user = users.FirstOrDefault(u => u.Username == username && u.Password == password);

        if (user != null)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role) 
            };

            var claimsIdentity = new ClaimsIdentity(claims, "CookieAuth"); 
            var authProperties = new AuthenticationProperties();

            await HttpContext.SignInAsync(
                "CookieAuth", 
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            return RedirectToAction("Dashboard", user.Role == "admin" ? "Admin" : "Empleado");
        }

        TempData["ErrorMessage"] = "Usuario o contraseña incorrectos";
        return RedirectToAction("Login", "Login");
    }

    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync("CookieAuth"); 
        return RedirectToAction("Login", "Login");
    }
}